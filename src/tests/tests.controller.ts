import { TestsService } from './tests.service';
import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Test } from './test.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('tests')
@ApiTags('Тест') 
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @ApiOperation({ summary: 'Вывод всех тестов' }) 
  @Get()
  findAll() {
    return this.testsService.findAll();
  }
      
  @ApiOperation({ summary: 'Вывод теста по id' })   
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Изменение теста' })     
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTest: Test) {
    return this.testsService.update(+id, updateTest);
  }

  @ApiOperation({ summary: 'Создание теста' })     
  @Post()
  create(@Body() createTest: Test) {
    return this.testsService.create(createTest);
  }

  @ApiOperation({ summary: 'Удаление теста' }) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testsService.remove(+id);
  }

}