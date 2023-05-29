import { Injectable } from "@nestjs/common";
import { Publisher } from "./publisher.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreatePublisherDto } from "./dto/PublisherDTO";
import { Test } from "src/tests/test.entity";
import { IncompletePublisherDto } from "./dto/incomplete-publisher.dto";

@Injectable()
export class PublishersService {

  constructor(
    @InjectRepository(Publisher) private readonly publisherRepository: Repository<Publisher>, // "внедряем" репозиторий Author в сервис
    @InjectRepository(Publisher) private readonly testRepository: Repository<Test>, // "внедряем" репозиторий Author в сервис
  ) {}

  async create(publisherDto: CreatePublisherDto): Promise<Publisher>
  {
    const publisher = this.publisherRepository.create(); //создаем объект Author из репозитория
    publisher.fullname = publisherDto.fullname; //заполняем поля объекта Author
    publisher.level = publisherDto.level;
    if (publisherDto.tests) {
      const tests = await this.testRepository.findBy({
        //получаем массив Affiliation по id
        id: In(publisherDto.tests),
      });
      publisher.tests = tests;
    }
    await this.publisherRepository.save(publisher); //сохраняем объект Author в БД
    return publisher; //возвращаем объект Author
  }

  async findAll(): Promise<Publisher[]> {
    const publishers = await this.publisherRepository.find({
      //получаем связанные объекты
      relations: { tests: true }
    }); //получаем массив Author из БД
    return publishers; //возвращаем массив Author
  }

  findOne(id: number): Promise<Publisher> {
    // Promise<Author> - указывает, что функция возвращает объект Author в виде Promise (c асинхронного потока)
    return this.publisherRepository.findOne({
      //получаем объект Author по id
      where: { id }, //указываем условие поиска по id
      relations: { tests: true }, //получаем связанные объекты
    });
  }

  async findIncomplete(): Promise<IncompletePublisherDto[]> {
    const publishers = await this.publisherRepository.find(); //получаем массив Author из БД
    const incompletePublishers: IncompletePublisherDto[] = publishers.map((publisher) => {
      //преобразуем массив Author в массив IncompleteAuthorDto
      const incompletePublisher = new IncompletePublisherDto();
      incompletePublisher.publisher_id = publisher.id;
      incompletePublisher.fullname = publisher.fullname;
      return incompletePublisher;
    });
    return incompletePublishers; //возвращаем массив IncompleteAuthorDto
  }

  async update(id: number, updatedPublisher: Publisher) {
    //получаем объект Author для обновления по id
    const publisher = await this.publisherRepository.findOne({ where: { id } }); //получаем объект Author по id из БД
    publisher.fullname = updatedPublisher.fullname; //обновляем поля объекта Author
    publisher.level = updatedPublisher.level;
    publisher.tests = updatedPublisher.tests;
    await this.publisherRepository.save(publisher); //сохраняем объект Author в БД
    return publisher; //возвращаем объект Author
  }

  remove(id: number) {
    this.publisherRepository.delete({ id }); //удаляем объект Author из БД
  }

}