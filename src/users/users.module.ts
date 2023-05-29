import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from 'src/activities/activity.entity';
import { Publisher } from 'src/publishers/publisher.entity';
import { Test } from 'src/tests/test.entity';
import { PublishersService } from 'src/publishers/publishers.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Test, Activity, Publisher, User]),
  ],
})
export class UsersModule {}