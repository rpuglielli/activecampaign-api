import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { ContactsService } from '../contacts/contacts.service';
import { CustomFieldDataService } from '../custom-field-data/custom-field-data.service';
import { TasksService } from '../tasks/tasks.service';

import {
  Deal,
  DealMainContact,
  DealNotes,
  DealSecondaryContacts,
  DealTasks,
  SecondaryContact,
  Note,
} from '@/constants/types';
import ActiveCampaign from '@/lib/ActiveCampaignApi';

import { dealsDto } from './dtos/deals.dto';

@Injectable()
export class DealsService {
  constructor(
    private readonly tasksService: TasksService,
    private readonly contactsService: ContactsService,
    private readonly customFieldDataService: CustomFieldDataService,
  ) {}

  async getDeal(dealId: number): Promise<Deal> {
    return ActiveCampaign.get(`/deals/${dealId}`);
  }

  async getMainContact(dealId: number): Promise<DealMainContact> {
    return ActiveCampaign.get(`/deals/${dealId}/contact`);
  }

  async listTasks(dealId: number): Promise<DealTasks> {
    return ActiveCampaign.get(`/deals/${dealId}/tasks`);
  }

  async deleteDeal(dealId: number): Promise<Deal> {
    return ActiveCampaign.delete(`/deals/${dealId}`);
  }

  async listContacts(dealId: number): Promise<SecondaryContact[]> {
    const { contactDeals }: DealSecondaryContacts = await ActiveCampaign.get(
      `/deals/${dealId}/contactDeals`,
    );

    return contactDeals;
  }

  async deduplicateContacts(dealId: number, dealsFromContacts: number[][]) {
    const mainDealContacts = await this.getAllContactsIds(dealId);

    return dealsFromContacts
      .reduce((allContacts, dealContacts) => [...allContacts, ...dealContacts])
      .filter((item, index, secondaryContacts) => {
        return (
          mainDealContacts.indexOf(item) === -1 &&
          secondaryContacts.indexOf(item) === index
        );
      });
  }

  async moveContacts(dealFrom: number[], dealTo: number): Promise<any> {
    const originDealsAllContacts = await Promise.all(
      dealFrom.map(async (dealId) => this.getAllContactsIds(dealId)),
    );

    const contacts = await this.deduplicateContacts(
      dealTo,
      originDealsAllContacts,
    );

    await Promise.all(
      contacts.map(async (contact) => {
        const contactDeal = {
          contactDeal: {
            contact,
            deal: dealTo,
          },
        };
        return ActiveCampaign.post('/contactDeals', contactDeal);
      }),
    );
  }

  async listNotes(dealId: number): Promise<DealNotes> {
    return ActiveCampaign.get(`/deals/${dealId}/notes`);
  }

  async insertNote(note, dealToId: number): Promise<Note> {
    const newNote = {
      note: {
        note: note.note,
        relid: dealToId,
        reltype: note.reltype,
        cdate: note.cdate,
        mdate: note.mdate,
      },
    };

    return ActiveCampaign.post('/notes', newNote);
  }

  async filterCustomFieldData(targetDealId: number, originDealId: number) {
    const targetDealFields =
      await this.customFieldDataService.listDealCustomFieldData(targetDealId);
    const originDealFields =
      await this.customFieldDataService.listDealCustomFieldData(originDealId);

    const targetDealFieldsIds = targetDealFields
      .filter(({ fieldValue }) => !!fieldValue)
      .map(({ customFieldId }) => customFieldId);

    return originDealFields.filter(
      ({ customFieldId, fieldValue }) =>
        fieldValue && !targetDealFieldsIds.includes(customFieldId),
    );
  }

  async moveCustomFieldData(originDealIds: number[], targetDealId: number) {
    const [originDealId] = originDealIds;
    const fields = await this.filterCustomFieldData(targetDealId, originDealId);

    return Promise.all(
      fields.map(async ({ customFieldId, fieldValue }) => {
        const data = { dealId: targetDealId, customFieldId, fieldValue };
        return this.customFieldDataService.createCustomFieldData(data);
      }),
    );
  }

  async buildDealToMerge(principalDealId: number, secondaryDealId: number[]) {
    const actions = [
      this.createTasksByDeal(secondaryDealId, principalDealId),
      this.moveContacts(secondaryDealId, principalDealId),
      this.moveCustomFieldData(secondaryDealId, principalDealId),
      this.createNotesByDeal(secondaryDealId, principalDealId),
    ];

    await Promise.all(actions);

    return this.deleteDeal(secondaryDealId[0]);
  }

  async mergeDeals({ targetDealId, originDealId }: dealsDto) {
    const origin = [originDealId];
    if (origin.includes(targetDealId)) {
      throw new UnprocessableEntityException(
        'Cannot merge main deal with itself!',
      );
    }

    const allDeals = [targetDealId, ...origin];

    await Promise.all(allDeals.map(async (dealId) => this.getDeal(dealId)));

    return this.buildDealToMerge(targetDealId, origin);
  }

  async createTasksByDeal(dealFrom: number[], dealTo: number) {
    const allTasks = await Promise.all(
      dealFrom.map(async (dealId) => this.listTasks(dealId)),
    );

    await Promise.all(
      allTasks.map((dealTask) => {
        Promise.all(
          dealTask.dealTasks.map((task) => {
            task.relid = dealTo;
            task.owner.id = dealTo;
            this.tasksService.createTask(dealTo, task);
          }),
        );
      }),
    );

    return allTasks;
  }

  async getAllContactsIds(dealId: number): Promise<number[]> {
    const { contact: mainContact } = await this.getMainContact(dealId);

    const secondaryContacts: SecondaryContact[] = await this.listContacts(
      dealId,
    );

    const secondaryContactsIds = secondaryContacts.map(({ contact }) =>
      Number(contact),
    );

    return [Number(mainContact.id), ...secondaryContactsIds];
  }

  async createNotesByDeal(dealFrom: number[], dealTo: number) {
    const allNotes = await Promise.all(
      dealFrom.map(async (dealId) => this.listNotes(dealId)),
    );

    await Promise.all(
      allNotes.map((dealNotes) => {
        Promise.all(
          dealNotes.notes.map((note) => {
            this.insertNote(note, dealTo);
          }),
        );
      }),
    );

    return allNotes;
  }
}
