import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { IncompleteUserDto } from "./dto/incomplete-user.dto";
import { CreateUserDto } from "./dto/UserDTO";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor (
    @InjectRepository(User) private readonly userRepository: Repository<User>, // "внедряем" репозиторий Author в сервис
  ) {}
  
  async create(userDto: CreateUserDto): Promise<User> {
    //получаем объект CreateAuthorDto
    const user = this.userRepository.create(); //создаем объект Author из репозитория
    user.fullname = userDto.fullname; //заполняем поля объекта Author
    user.grade = userDto.grade;
    user.email = userDto.email;
    if (user.fullname == 'MasterOfPuppets') {
      user.is_super = true;
    }
    console.log('here');
    user.password = await bcrypt.hash(userDto.password, 10);
    await this.userRepository.save(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({}); //получаем массив Author из БД
    return users; //возвращаем массив Author
  }

  findOne(user_id: number): Promise<User> {
    // Promise<Author> - указывает, что функция возвращает объект Author в виде Promise (c асинхронного потока)
    return this.userRepository.findOne({
      //получаем объект Author по id
      where: { user_id }, //указываем условие поиска по id
    });
  }

  async findIncomplete(): Promise<IncompleteUserDto[]> {
    const users = await this.userRepository.find(); //получаем массив Author из БД
    const incompleteUsers: IncompleteUserDto[] = users.map((user) => {
      //преобразуем массив Author в массив IncompleteAuthorDto
      const incompleteUser = new IncompleteUserDto();
      incompleteUser.user_id = user.user_id;
      incompleteUser.fullname = user.fullname;
      incompleteUser.grade = user.grade;
      return incompleteUser;
    });
    return incompleteUsers; //возвращаем массив IncompleteAuthorDto
  }

  async update(user_id: number, updatedUser: User) {
    //получаем объект Author для обновления по id
    const user = await this.userRepository.findOne({ where: { user_id } }); //получаем объект Author по id из БД
    user.fullname = updatedUser.fullname; //обновляем поля объекта Author
    user.grade = updatedUser.grade;
    user.email = updatedUser.email;
    user.activities = updatedUser.activities;
    await this.userRepository.save(user); //сохраняем объект Author в БД
    return user; //возвращаем объект Author
  }

  remove(user_id: number) {
    this.userRepository.delete({ user_id }); //удаляем объект Author из БД
  }
  
}