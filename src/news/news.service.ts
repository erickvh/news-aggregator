import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { New } from '../interfaces/New.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class NewsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getGuardianArticles(searchContent: string) {
    const apiKey = this.configService.get('API_KEY_GUARDIAN');
    const filterNewest = 'order-by=newest&show-fields=byline';
    return this.httpService
      .get(
        `https://content.guardianapis.com/search?api-key=${apiKey}&q=${searchContent}&${filterNewest}`,
      )
      .pipe();
  }
}
