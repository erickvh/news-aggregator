import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class EmptySearchMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (!req.query.q) {
      throw new BadRequestException('q param not defined');
    }
    next();
  }
}
