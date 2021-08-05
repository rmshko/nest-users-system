import { Controller, Post, Delete, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() authUserDto: AuthenticateUserDto) {
    const authData = await this.authService.authenticateUser(authUserDto);

    if (authData) {
      const token = this.jwtService.sign(authData);

      return { token };
    }
  }
}
