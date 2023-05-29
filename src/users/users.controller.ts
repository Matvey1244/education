import { UsersService } from './users.service';
import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { User } from './user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';



@Controller('users')
@ApiTags('Пользователь') // Тег для документации
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Вывод всех пользователей' }) // Операция для Swagger
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Вывод неполной информации о пользователях' })   
  @Get('incomplete')
  findIncomplete() {
    return this.usersService.findIncomplete();
  }

  @ApiOperation({ summary: 'Вывод пользователя по id' })  
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Изменение пользователя' })  
  @Put(':id')
  update(@Param('id') id: number, @Body() updateUser: User) {
    return this.usersService.update(id, updateUser);
  }

  @ApiOperation({ summary: 'Создание пользователя' })  
  @Post()
  create(@Body() createUser: User) {
    return this.usersService.create(createUser);
  }

  @ApiOperation({ summary: 'Удаление пользователя' }) 
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

}