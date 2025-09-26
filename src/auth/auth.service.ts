import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { EmailService } from 'src/email/email.service';
import { ChangePasswordInput } from './dto/changePassword.dto';
dotenv.config();
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private redicClient: RedisService,
    private emailService: EmailService,
  ) {}
  async generateToken(user: number) {
    const payload = {
      sub: user,
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '2m',
    });
    return token;
  }
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
    const refreshToken = await this.createRefreshToken(userExist.id);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false, // Set to false if running locally without HTTPS
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { accessToken, refreshToken };
  }
  async verfiyToken(token: string) {
    const verfiyToken = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    return verfiyToken;
  }
  async createRefreshToken(userId: number) {
    const payload = { sub: userId };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
    const hashed = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateUser(userId, { refreshToken: hashed });
    return refreshToken;
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const user = await this.userService.findOneUser(decoded.sub);
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('this user not authorized');
      }
      const matching = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!matching) {
        throw new UnauthorizedException(' the rerfreshtoken miss match');
      }
      const payload = { email: user.email, sub: user.id };
      const access_token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '2m',
      });

      return { access_token };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
  async logout(token: string, res: Response): Promise<string> {
    if (!token) {
      throw new NotFoundException('no jwt exist in req');
    }

    const payload = this.jwtService.decode(token);
    console.log('debugging ', payload);

    if (!payload) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    await this.userService.updateUser(payload.sub, { refreshToken: null });

    const ttl = payload?.exp
      ? payload.exp - Math.floor(Date.now() / 1000)
      : 3600;
    await this.redicClient.setValue(`blacklist:${token}`, 'true');

    res.clearCookie('access_token');

    return 'Logged out';
  }
  async validateRefreshToken(refreshToken: string): Promise<boolean> {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const user = await this.userService.findOneUser(decoded.sub);
      if (!user || !user.refreshToken) return false;

      const match = await bcrypt.compare(refreshToken, user.refreshToken);
      return match;
    } catch {
      return false;
    }
  }
  async changePassword(input: ChangePasswordInput): Promise<string> {
    const user = await this.userService.findOneUser(input.userId);
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(input.currentPassword, user.password);
    if (!isMatch)
      throw new BadRequestException('Current password is incorrect');

    user.password = await bcrypt.hash(input.newPassword, 10);
    await this.userService.saveUser(user);
    return 'Password changed successfully';
  }
}
