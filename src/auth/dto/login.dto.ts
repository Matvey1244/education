import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {

  @ApiProperty({ example: 'email@gmail.com', description: 'email' })
  email: string;

  @ApiProperty({ example: 'goncharovoblomov', description: 'Пароль' })
  password: string;

}