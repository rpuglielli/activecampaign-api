import { Injectable } from '@nestjs/common';

import ActiveCampaign from '@/lib/ActiveCampaignApi';

@Injectable()
export class ContactsService {
  async getContact(contactId: number) {
    return ActiveCampaign.get(`/contacts/${contactId}`);
  }
}
