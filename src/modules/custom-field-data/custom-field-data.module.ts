import { Module } from '@nestjs/common';

import { CustomFieldDataService } from './custom-field-data.service';

@Module({
  providers: [CustomFieldDataService],
  exports: [CustomFieldDataService],
})
export class CustomFieldDataModule {}
