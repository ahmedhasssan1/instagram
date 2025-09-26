import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import * as dotenv from 'dotenv';
dotenv.config();
export const IS_PUBLIC = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC, true);
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException('No access token provided');
    }

    const inBlacklist = await this.redisService.getValue(`blacklist:${token}`);
    if (inBlacklist) {
      throw new UnauthorizedException('This user has been revoked');
    }

    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      req.user = payload;
      return true;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const decoded: any = this.jwtService.decode(token);
        if (!decoded || !decoded.sub) {
          throw new UnauthorizedException('Invalid token');
        }

        const user = await this.userService.findOneUser(decoded.sub);
        if (!user ||!user.refreshToken) {
          throw new UnauthorizedException('invalid user');
        }

      

        req.user = { sub: decoded.sub }; // minimal user info
        return true;
      }

      console.log('[JwtGuard] Access token invalid:', err.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
