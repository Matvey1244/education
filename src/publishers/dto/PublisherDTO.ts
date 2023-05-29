import { ApiProperty } from "@nestjs/swagger";
import { Test } from "src/tests/test.entity";

export class CreatePublisherDto {
  @ApiProperty({ example: 'Петров Петр Иванович', description: 'ФИО' })
  fullname: string;
  @ApiProperty({ example: '1', description: 'Уровень' })
  level: number;
  tests: Test[];
}
