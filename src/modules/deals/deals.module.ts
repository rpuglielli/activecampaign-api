import { Module, HttpModule } from '@nestjs/common';

import { TasksService } from '../tasks/tasks.service';
import { DealsService } from './deals.service';

import { ContactsModule } from '../contacts/contacts.module';
import { CustomFieldDataModule } from '../custom-field-data/custom-field-data.module';
import { TasksModule } from '../tasks/tasks.module';
import { DealsController } from './deals.controller';

@Module({
  imports: [HttpModule, TasksModule, ContactsModule, CustomFieldDataModule],
  providers: [DealsService, TasksService],
  controllers: [DealsController],
})
export class DealsModule {}
