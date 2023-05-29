import { ApiProperty } from "@nestjs/swagger";
import { Activity } from "src/activities/activity.entity";
import { Publisher } from "src/publishers/publisher.entity";

export class CreateTestDto {
  @ApiProperty({ example: 'Тест по геометрии для 10х классов', description: 'Название' })
  title: string;
  @ApiProperty({ example: 'Геометрия', description: 'Предмет' })
  subject: string;
  @ApiProperty({ example: '10', description: 'Класс' })
  grade: number;
  // @ApiProperty({ example: '2', description: 'Автор' })
  // publisher_id: number;
  @ApiProperty({
    example: [1, 2],
    description: 'Список авторов',
  })
  publishers: Publisher[];
  @ApiProperty({
    example: [1, 2],
    description: 'Список действий',
  })
  activities: Activity[];
}
