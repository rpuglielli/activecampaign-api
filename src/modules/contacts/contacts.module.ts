import { HttpModule, Module } from '@nestjs/common';

import { ContactsService } from './contacts.service';

import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [HttpModule, TasksModule],
  providers: [ContactsService],
  exports: [ContactsService],
})
export class ContactsModule {}
