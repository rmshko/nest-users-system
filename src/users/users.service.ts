import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findExcept(login: string): Promise<User[]> {
    return this.userModel
      .find({ login: { $ne: login } })
      .select('login age')
      .exec();
  }

  async findOne(login: string): Promise<User> {
    return (await this.userModel.findOne({ login }).exec()).toObject();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);

    return newUser.save();
  }

  async update(login: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ login }, updateUserDto).exec();
  }

  async remove(login: string) {
    await this.userModel.deleteOne({ login });
  }
}
