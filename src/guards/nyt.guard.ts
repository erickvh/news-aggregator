import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class NytGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    if (req.query.source === 'nyt' || !req.query.source) {
      const authHeader = req.headers.authorization;
      if (!authHeader)
        throw new UnauthorizedException(
          'Token needed to access on resource nyt',
        );
      const bearer = authHeader.split(' ')[1];
      const jwtToken = this.configService.get('JWT_SECRET');

      try {
        verify(bearer, jwtToken);
        return true;
      } catch {
        throw new UnauthorizedException('Invalid token');
      }
    }
    return true;
  }
}
