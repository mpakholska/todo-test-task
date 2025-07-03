import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from 'src/shared/config/config';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = jwt.verify(token, config.jwt.secret);

      if (!payload) {
        throw new UnauthorizedException('Invalid token');
      }
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies['token'];
  }
}
