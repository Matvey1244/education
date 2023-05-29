import { Injectable } from '@nestjs/common';
import { Test } from 'src/tests/test.entity';
import { Publisher } from 'src/publishers/publisher.entity';
import { User } from 'src/Users/user.entity';

@Injectable()
export class DatasourceService {
  private tests: Test[] = [];
  private publishers: Publisher[] = [];
  private users: User[] = [];

  getTests(): Test[] {
    return this.tests;
  }

  getPublishers(): Publisher[] {
    return this.publishers;  
  }

  getUsers(): Publisher[] {
    return this.publishers;  
  }

}



