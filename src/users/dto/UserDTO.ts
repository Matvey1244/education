import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО' })
  fullname: string;
  @ApiProperty({ example: '1', description: 'Уровень' })
  grade: number;
  @ApiProperty({ example: 'ivanov345@gmail.com', description: 'email' })
  email: string;
  @ApiProperty({ example: 'password', description: 'Пароль' })
  password: string;
}
