import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { compare, hash } from 'bcrypt';
import { RedisService } from 'src/redis/redis.service';
import { EmailService } from 'src/email/email.service';
import { resetPasswordDto } from './dto/otp.dto';

@Injectable()
export class otpService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private redisClient: RedisService,
    private emailService: EmailService,
  ) {}

  private readonly OTP_EXPIRATION_TIME = 5 * 60; // 5 minutes
  private readonly SHORT_COOLDOWN_TIME = 60; // 1 minute
  private readonly LONG_COOLDOWN_TIME = 3600; // 1 hour

  generateRandomOtp(): string {
    return crypto.randomInt(100000, 1000000).toString();
  }

  async storeOtp(email: string, otp: string): Promise<void> {
    const otpKey = `otp:${email}`;
    const retryKey = `retryCount:otp:${email}`;

    await this.redisClient.setValue(otpKey, otp, this.OTP_EXPIRATION_TIME);
    await this.redisClient.setValue(retryKey, '0', this.OTP_EXPIRATION_TIME);
  }

  async applyCooldown(email: string, cooldownTime: number): Promise<void> {
    const currentTime = Math.floor(Date.now() / 1000);
    const cooldownKey = `cooldown:otp:${email}`;

    await this.redisClient.setValue(
      cooldownKey,
      (currentTime + cooldownTime).toString(),
      cooldownTime,
    );
  }

  async isOnCooldown(email: string): Promise<void> {
    const cooldownKey = `cooldown:otp:${email}`;
    const cooldownTimestamp = await this.redisClient.getValue(cooldownKey);

    if (!cooldownTimestamp) return;

    const currentTime = Math.floor(Date.now() / 1000);
    const cooldownUntil = Number(cooldownTimestamp);

    if (currentTime < cooldownUntil) {
      const leftTime = cooldownUntil - currentTime;
      const minutes = Math.floor(leftTime / 60);
      const seconds = leftTime % 60;

      throw new HttpException(
        `OTP is on cooldown. Please wait ${minutes} minutes and ${seconds} seconds.`,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }

  async requestOtp(email: string, name: string): Promise<string> {
    await this.isOnCooldown(email);

    const otp = this.generateRandomOtp();
    const hashedOtp = await hash(otp, 10); // always use saltRounds

    await this.storeOtp(email, hashedOtp);
    await this.applyCooldown(email, this.SHORT_COOLDOWN_TIME);

    // Normally you would send the OTP via email/SMS here
    console.log(`Generated OTP for ${email}: ${otp}`);
    await this.emailService.sendEmail(email, name, otp);
    return otp;
  }

  async verifyOtp(email: string, otp: string): Promise<string> {
    const otpKey = `otp:${email}`;
    const retryKey = `retryCount:otp:${email}`;

    const storedOtp = await this.redisClient.getValue(otpKey);

    let retryCount = Number(await this.redisClient.getValue(retryKey)) || 0;
    const useremail = await this.userService.findUserByEmail(email);
    if (!useremail) {
      throw new HttpException('email not found', HttpStatus.FORBIDDEN);
    }
    if (!storedOtp) {
      throw new HttpException(
        'OTP expired  or not found',
        HttpStatus.FORBIDDEN,
      );
    }
    if (retryCount >= 5) {
      throw new HttpException(
        'Maximum retry attempts reached',
        HttpStatus.FORBIDDEN,
      );
    }

    const isVerified = await compare(otp, storedOtp);

    if (!isVerified) {
      retryCount += 1;
      await this.redisClient.setValue(retryKey, retryCount.toString());

      if (retryCount >= 5) {
        await this.applyCooldown(email, this.LONG_COOLDOWN_TIME);
      }

      throw new HttpException('Invalid OTP', HttpStatus.FORBIDDEN);
    }

    // OTP is correct — optionally delete OTP and retry count
    await this.redisClient.setValue(otpKey, '', 1); // delete soon
    await this.redisClient.setValue(retryKey, '0', 1);

    return 'verfied';
  }
  async newPass(userPass: resetPasswordDto) {
    await this.userService.newPassword(userPass);
  }
}
