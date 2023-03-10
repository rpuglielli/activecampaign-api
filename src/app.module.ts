import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';

import { AppController } from './app.controller';
import { ContactsModule } from './modules/contacts/contacts.module';
import { CustomFieldDataModule } from './modules/custom-field-data/custom-field-data.module';
import { DealsModule } from './modules/deals/deals.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    ContactsModule,
    DealsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TasksModule,
    CustomFieldDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
