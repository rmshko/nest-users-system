import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hash(createUserDto.password);

    await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async authenticateUser(authUserDto: AuthenticateUserDto) {
    const user = await this.usersService.findOne(authUserDto.login);

    if (user && (await bcrypt.compare(authUserDto.password, user.password))) {
      const { password, ...userData } = user;

      return userData;
    }

    return null;
  }

  private async hash(pwdString: string) {
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(pwdString, salt);
  }
}
