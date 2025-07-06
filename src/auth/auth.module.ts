import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[UsersModule,JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(configService:ConfigService)=>({
      secret:configService.get<string>('jwt_sercet'),
      signOptions:{expiresIn:'2h'}
    })
  })],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
