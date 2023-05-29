import { ActivitiesService } from './activities.service';
import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Activity } from './activity.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('activities')
@ApiTags('История выполнения тестов') 
export class ActivitiesController {

  constructor(private readonly activitiesService: ActivitiesService) {}

  @ApiOperation({ summary: 'Вывод истории выполнения тестов' }) 
  @Get()
  findAll() {
    return this.activitiesService.findAll();
  }
  
  @ApiOperation({ summary: 'Вывод действия по id' })   
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Изменение действия' })   
  @Put(':id')
  update(@Param('id') id: string, @Body() updateActivity: Activity) {
    return this.activitiesService.update(+id, updateActivity);
  }

  @ApiOperation({ summary: 'Создание действия' })   
  @Post()
  create(@Body() createActivity: Activity) {
    return this.activitiesService.create(createActivity);
  }
  
  @ApiOperation({ summary: 'Удаление действия' })   
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(+id);
  }
    
}