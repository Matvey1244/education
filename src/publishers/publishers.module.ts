import { Module } from '@nestjs/common';
import { Publisher } from './publisher.entity';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from 'src/activities/activity.entity';
import { User } from 'src/users/user.entity';
import { Test } from 'src/tests/test.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [PublishersController],
  providers: [PublishersService, UsersService],
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Test, Activity, Publisher, User]),
    JwtModule.register({
      secret: 'xxxtentacion',
      signOptions: {expiresIn: '1h'}
    })
  ],
})
export class PublishersModule {}