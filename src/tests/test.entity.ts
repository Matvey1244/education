import { ApiProperty } from '@nestjs/swagger';
import { Activity } from 'src/activities/activity.entity';
import { Publisher } from 'src/publishers/publisher.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tests')
export class Test {

  @ApiProperty({ example: '2', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Тест по геометрии для 10х классов', description: 'Название' })
  @Column({ unique: true }) //поле должно быть уникальным
  title: string;

  @ApiProperty({ example: 'Геометрия', description: 'Предмет' })
  @Column()
  subject: string;

  @ApiProperty({ example: '10', description: 'Класс' })
  @Column()
  grade: number;

  // @ApiProperty({ example: '2', description: 'Автор' })
  // @Column()
  // publisher_id: number;
  @OneToMany((type) => Activity, (activity) => activity.tests)
  @JoinTable({
    name: 'activity_test',
    joinColumn: { name: 'test_id' }
  })
  activities: Activity[];

  @ManyToOne((type) => Publisher, (publisher) => publisher.tests)
  @JoinTable({
    name: 'publisher_test',
    joinColumn: { name: 'publisher_id' }
  })
  publishers: Publisher[];

}

