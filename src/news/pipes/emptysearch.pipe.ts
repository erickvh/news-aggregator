import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class EmptysearchPipe implements PipeTransform {
  transform(value: string) {
    if (!value) {
      throw new BadRequestException('q param not defined');
    }

    return value;
  }
}
