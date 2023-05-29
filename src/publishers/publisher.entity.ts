import { ApiProperty } from '@nestjs/swagger';
import { Test } from 'src/tests/test.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('publishers')
export class Publisher {

  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Петров Петр Иванович', description: 'ФИО' })
  @Column({ unique: true }) //поле должно быть уникальным
  fullname: string;

  @ApiProperty({ example: '1', description: 'Уровень' })
  @Column()
  level: number;

  @OneToMany((type) => Test, (test) => test.publishers)
  @JoinTable({
    name: 'publisher_test',
    joinColumn: { name: 'publisher_id' }
  })
  tests: Test[];

}