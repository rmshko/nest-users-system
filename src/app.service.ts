import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService) {}

  async getHomepageData(user) {
    const { _id, login, age } = user;
    const otherUsers = await this.usersService.findExcept(login);

    return {
      user: {
        _id,
        login,
        age,
      },
      otherUsers,
    };
  }
}
