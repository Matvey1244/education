import { Module } from '@nestjs/common';
import { Activity } from './activity.entity'
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activity.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from 'src/publishers/publisher.entity';
import { User } from 'src/users/user.entity';
import { Test } from 'src/tests/test.entity';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Test, Activity, Publisher, User]), // !!! В модуле автор мы используем все три сущности, поэтому все три сущности необходимо импортирвоать!
  ],
})
export class ActivitiesModule {}
