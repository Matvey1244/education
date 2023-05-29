import { User } from 'src/users/user.entity';
import { Test } from 'src/tests/test.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('activity') //указываем что это не просто клаcс, а сущность в рамках TypeOrm, в БД будет храниться как таблица
export class Activity {
  @ApiProperty({ example: '2', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn() //колонка - идентификатор, значение генерируется автоматически
  id: number;

  @ApiProperty({ example: '2', description: 'Пользователь выполнивший тест' })
  @Column({}) //колонка таблицы, сюда можно добавить большое количество параметров для БД, например тип, уникальность, триггер и т.д.
  user_id: number;

  @ApiProperty({ example: '2', description: 'Тест' })
  @Column()
  test_id: number;

  @ApiProperty({ example: '2023-04-03 21:59', description: 'Время начала выполнения' })
  @Column()
  start_time: string;

  @ApiProperty({ example: '2023-04-03 22:03', description: 'Время окончания выполнения' })
  @Column()
  end_time: string;

  @ManyToOne((type) => Test, (test) => test.activities) //Создадим связь многие ко многим с сущностью article и свяжем с полем authors в статье
  @JoinTable({
    //join таблица с названием author_article
    name: 'activity_test',
    joinColumn: { name: 'test_id' } //для связи с идентификатором автора
  })
  tests: Test[]; //объект, в котором будем автоматически получать все статьи автора

  @ManyToOne((type) => User, (user) => user.activities) //тоже самое для аффилиаций
  @JoinTable({
    name: 'activity_user',
    joinColumn: { name: 'user_id' }
  })
  users: User[];

}

  