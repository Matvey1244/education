import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Авторизация')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginUserDto,
    @Res({passthrough: true}) response: Response
  ) {
    const user = await this.authService.findOne(loginDto.email);
    
    if (!user) {
      throw new BadRequestException('Пользователь не существует');
    }

    if (!await bcrypt.compare(loginDto.password, user.password)) {
      throw new BadRequestException('Неверный пароль');
    }

    const jwt = await this.jwtService.signAsync({id: user.user_id});

    response.cookie('jwt', jwt, {httpOnly: true});
    response.cookie('user_id', user.user_id, {httpOnly: true});
    return {
      message: `Logged in as ${user.fullname}`
    };
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) response: Response) {
    response.clearCookie('jwt');
    response.clearCookie('user_id');
    return {
      message: 'Logged out'
    }
  }
}