import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, catchError } from 'rxjs/operators';
import { parseGuardian } from 'src/parsers/guardianParse';
import { NYTParse } from 'src/parsers/NYTParse';
import { throwError } from 'rxjs';
import { AxiosError } from 'axios';

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
      .pipe(
        map(
          response => response.data.response.results.map(parseGuardian),
          catchError((error: AxiosError) => {
            return throwError(
              new HttpException(error.message, error.response.status),
            );
          }),
        ),
      );
  }

  getNYTimesArticles(searchContent: string) {
    const apiKey = this.configService.get('API_KEY_NYT');
    const filterNewest = 'sort=newest';

    return this.httpService
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${searchContent}&filter&${filterNewest}`,
      )
      .pipe(
        map(response => response.data.response.docs.map(NYTParse)),
        catchError((error: AxiosError) => {
          return throwError(
            new HttpException(error.message, error.response.status),
          );
        }),
      );
  }

  getArticles(searchContent: string, source: string) {
    switch (source) {
      case 'nyt':
        return this.getNYTimesArticles(searchContent);
        break;
      case 'guardian':
        return this.getGuardianArticles(searchContent);
        break;
    }
  }
}
