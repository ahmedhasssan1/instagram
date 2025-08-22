import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { compare, hash } from 'bcrypt';

import { RedisService } from 'src/redis/redis.service';
  import { Request } from 'express';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private redicClient: RedisService,
  ) {}

  async login(login: LoginDto, res: Response) {
    const userExist = await this.userService.findUserByEmail(login.email);
    if (!userExist) {
      throw new NotFoundException('this user with this email not exist');
    }
    const matchPassword = await bcrypt.compare(
      login.password,
      userExist.password,
    );
    if (!matchPassword) {
      throw new UnauthorizedException('the password is inncorect');
    }
    const payload = {
      sub: userExist.id,
      email: userExist.email,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false, // Set to false if running locally without HTTPS
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return accessToken;
  }
}
