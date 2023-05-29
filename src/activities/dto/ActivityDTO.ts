import { ApiProperty } from "@nestjs/swagger";

export class CreateActivityDto {

  @ApiProperty({ example: '2', description: 'Пользователь выполнивший тест' })
  user_id: number;

  @ApiProperty({ example: '2', description: 'Тест' })
  test_id: number;

  @ApiProperty({ example: '2023-04-03 21:59', description: 'Время начала выполнения' })
  start_time: string;

  @ApiProperty({ example: '2023-04-03 22:03', description: 'Время окончания выполнения' })
  end_time: string;

}
