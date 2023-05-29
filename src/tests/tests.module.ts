import { Module } from '@nestjs/common';
import { Test } from './test.entity'
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from 'src/activities/activity.entity';
import { Publisher } from 'src/publishers/publisher.entity';
import { User } from 'src/users/user.entity';

@Module({
  controllers: [TestsController],
  providers: [TestsService],
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Test, Activity, Publisher, User]), // !!! В модуле автор мы используем все три сущности, поэтому все три сущности необходимо импортирвоать!
  ],
})
export class TestsModule {}

