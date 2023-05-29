import { PublishersService } from './publishers.service';
import { Controller, Req, UnauthorizedException } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Publisher } from './publisher.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';


@Controller('publishers')
@ApiTags('Автор') 
export class PublishersController {

  constructor(
    private readonly publishersService: PublishersService,
    private readonly userService: UsersService,
    private jwtService: JwtService) {}

    @ApiOperation({ summary: 'Вывод всех авторов' }) 
    @Get()
    findAll() {
      return this.publishersService.findAll();
    }
  
    @ApiOperation({ summary: 'Вывод неполной информации об авторах' }) 
    @Get('incomplete')
    findIncomplete() {
      return this.publishersService.findIncomplete();
    }

    @ApiOperation({ summary: 'Вывод автора по id' })   
    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.publishersService.findOne(id);
    }
    
    @ApiOperation({ summary: 'Изменение автора' })     
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updatePublisher: Publisher,
      @Req() request: Request
    ) {
      try {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        if (!data || !(await this.userService.findOne(request.cookies['user_id'])).is_super) {
          throw new UnauthorizedException();
        }
        return this.publishersService.update(+id, updatePublisher);
      } catch (e) {
        throw new UnauthorizedException();
      }
    }
    
    @ApiOperation({ summary: 'Создание автора' })   
    @Post()
    async create(
      @Body() createPublisher: Publisher,
      @Req() request: Request
    ) {
      try {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        if (!data || !(await this.userService.findOne(request.cookies['user_id'])).is_super) {
          throw new UnauthorizedException();
        }
        return this.publishersService.create(createPublisher);
      } catch (e) {
        throw new UnauthorizedException();
      }
    }
  
    @ApiOperation({ summary: 'Удаление автора' }) 
    @Delete(':id')
    async remove(
      @Param('id') id: string,
      @Req() request: Request
    ) {
      try {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        if (!data || !(await this.userService.findOne(request.cookies['user_id'])).is_super) {
          throw new UnauthorizedException();
        }
        return this.publishersService.remove(+id);
      } catch (e) {
        throw new UnauthorizedException();
      }
    }
  }