import { Injectable } from '@nestjs/common';

import { CustomFieldValue, DealCustomFieldValues } from '@/constants/types';
import ActiveCampaign from '@/lib/ActiveCampaignApi';

import { CustomFieldDataDto } from './dtos/custom-field-data.dto';

@Injectable()
export class CustomFieldDataService {
  async listDealCustomFieldData(dealId: number): Promise<CustomFieldValue[]> {
    const { dealCustomFieldData }: DealCustomFieldValues =
      await ActiveCampaign.get(`/deals/${dealId}/dealCustomFieldData`);

    return dealCustomFieldData;
  }

  async createCustomFieldData(customFieldData: CustomFieldDataDto) {
    return ActiveCampaign.post('/dealCustomFieldData', customFieldData);
  }
}
