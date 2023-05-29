import { Activity } from 'src/activities/activity.entity';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  user_id: number;

  @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО' })
  @Column({ unique: true }) //поле должно быть уникальным
  fullname: string;

  @ApiProperty({ example: '1', description: 'Уровень' })
  @Column()
  grade: number;

  @ApiProperty({ example: 'ivanov345@gmail.com', description: 'email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'password', description: 'Пароль'})
  @Column()
  password: string

  @OneToMany((type) => Activity, (activity) => activity.user_id)
  @JoinTable({
    name: 'activity_user',
    joinColumn: { name: 'user_id' }
  })
  activities: Activity[];

  @Column({default: false})
  is_super: boolean

}