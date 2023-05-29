import { Injectable } from "@nestjs/common";
import { Test } from "./test.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateTestDto } from "./dto/TestDTO";
import { Publisher } from "src/publishers/publisher.entity";
import { Activity } from "src/activities/activity.entity";


@Injectable()
export class TestsService {

  constructor(
    @InjectRepository(Test) private readonly testRepository: Repository<Test>,
    @InjectRepository(Publisher) private readonly publisherRepository: Repository<Publisher>,
    @InjectRepository(Activity) private readonly ActivityRepository: Repository<Activity>,
  ) {}
    
  async create(testDto: CreateTestDto): Promise<Test> {
    //получаем объект CreateAuthorDto
    const test = this.testRepository.create(); //создаем объект Author из репозитория
    test.title = testDto.title; //заполняем поля объекта Author
    test.subject = testDto.subject
    test.grade = testDto.grade
    console.log(test.activities)
    await this.testRepository.save(test)
    for (let _activity of testDto.activities){
      let activity = this.ActivityRepository.create({..._activity})
      await this.ActivityRepository.save(activity)
    }
    return test

      // test.publisher_id = testDto.publisher_id;
      // if (testDto.publishers){
      //   const publisher = await this.publisherRepository.findBy({
      //       id: In(testDto.publishers)
      //   });
      //   test.publishers = publisher
      // }
      // if (testDto.activities){
      //   const activity = await this.ActivityRepository.findBy({
      //       id: In(testDto.activities)
      //   });
      //   test.activities = activity
      // }
      // await this.testRepository.save(test); //сохраняем объект Author в БД
      // return test; //возвращаем объект Author
  }

  async findAll(): Promise<Test[]> {
    const authors = await this.testRepository.find({
      //получаем связанные объекты
      relations: {
        activities: true,
        publishers: true,
      },
    }); //получаем массив Author из БД
    return authors; //возвращаем массив Author
  }

  findOne(id: number): Promise<Test> {
    return this.testRepository.findOne({where: { id }});
  }

  async update(id: number, updatedTest: Test) {
    //получаем объект Author для обновления по id
    const test = await this.testRepository.findOne({ where: { id } }); //получаем объект Author по id из БД
    test.title = updatedTest.title; //обновляем поля объекта Author
    test.subject = updatedTest.subject;
    test.grade = updatedTest.grade;
    test.activities = updatedTest.activities;
    test.publishers = updatedTest.publishers;
    await this.testRepository.save(test); //сохраняем объект Author в БД
    return test; //возвращаем объект Author
  }

  remove(id: number) {
    this.testRepository.delete({ id }); //удаляем объект Author из БД
  }

}
 
        
    


