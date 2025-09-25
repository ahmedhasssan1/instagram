import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { otpDto, resetPasswordDto } from 'src/auth/dto/otp.dto';
import { otpService } from 'src/auth/otp.service';
import th from 'zod/v4/locales/th.cjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private userRepo: Repository<Users>) {}

  async createUser(userDto: CreateUserDto): Promise<Users> {
    const { password, ...rest } = userDto;
    const hashPassword = await bcrypt.hash(password, 10);
    const userExist = await this.userRepo.findOne({
      where: { email: userDto.email },
    });
    if (userExist) {
      throw new BadRequestException('this user already exist');
    }
    const user = this.userRepo.create({
      ...rest,
      password: hashPassword,
    });
    console.log(hashPassword);
    return this.userRepo.save(user);
  }
  async findOneUser(id: number): Promise<Users> {
    const findUser = await this.userRepo.findOneBy({ id });
    if (!findUser) {
      throw new NotFoundException('this user not exist');
    }
    return findUser;
  }
  async findUserByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('this user not exist');
    }
    return user;
  }

  async allUser() {
    const users = await this.userRepo.find();
    return users;
  }

  async newPassword(userEmail: resetPasswordDto): Promise<String> {
    const user = await this.findUserByEmail(userEmail.email);
    if (!user) {
      throw new BadRequestException('this user with this email not exist');
    }
    const hashPassword = await bcrypt.hash(userEmail.newPassword, 10);
    const newPass = (user.password = hashPassword);
    await this.userRepo.save(user);
    return 'password changed';
  }
  async updateUser(userId: number, body: Partial<Users>) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('this user not exist');
    }

    const updatedUser = this.userRepo.merge(user, body);
    return await this.userRepo.save(updatedUser);
  }
}
