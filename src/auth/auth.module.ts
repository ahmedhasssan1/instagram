import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from 'src/redis/redis.module';
import { EmailModule } from 'src/email/email.module';
import { otpService } from './otp.service';
import { JwtGuard } from './guradAuth/check_JWT';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '20s' },
      }),
    }),
    BullModule.registerQueue({
      name: 'main-queue',
    }),
    forwardRef(() => EmailModule),
    RedisModule,
  ],
  providers: [AuthResolver, AuthService, otpService, JwtGuard],
  exports: [AuthService, otpService],
})
export class AuthModule {}
