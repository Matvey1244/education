import { Injectable } from "@nestjs/common";
import { Activity } from "./activity.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateActivityDto } from "./dto/ActivityDTO";

@Injectable()
export class ActivitiesService {

  constructor(
    @InjectRepository(Activity) private readonly activityRepository: Repository<Activity>, // "внедряем" репозиторий Author в сервис
  ) {}
    
  async create(activityDto: CreateActivityDto): Promise<Activity> {
    //получаем объект CreateAuthorDto
    const activity = this.activityRepository.create(); //создаем объект Author из репозитория
    activity.user_id = activityDto.user_id; //заполняем поля объекта Author
    activity.test_id = activityDto.test_id;
    activity.start_time = activityDto.start_time
    activity.end_time = activityDto.end_time
    await this.activityRepository.save(activity); //сохраняем объект Author в БД
    return activity; //возвращаем объект Author
  }

  async findAll(): Promise<Activity[]> {
    const activities = await this.activityRepository.find({
      //получаем связанные объекты
    }); //получаем массив Author из БД
    return activities; //возвращаем массив Author
  }

  findOne(id: number): Promise<Activity> {
    // Promise<Author> - указывает, что функция возвращает объект Author в виде Promise (c асинхронного потока)
    return this.activityRepository.findOne({
      //получаем объект Author по id
      where: { id }, //указываем условие поиска по id
    });
  }

  async update(id: number, updatedActivity: Activity) {
    //получаем объект Author для обновления по id
    const activity = await this.activityRepository.findOne({ where: { id } }); //получаем объект Author по id из БД
    activity.user_id = updatedActivity.user_id; //обновляем поля объекта Author
    activity.test_id = updatedActivity.test_id;
    activity.start_time = updatedActivity.start_time;
    activity.end_time = updatedActivity.end_time;
    await this.activityRepository.save(activity); //сохраняем объект Author в БД
    return activity; //возвращаем объект Author
  }

  remove(id: number) {
    this.activityRepository.delete({ id }); //удаляем объект Author из БД
  }

}