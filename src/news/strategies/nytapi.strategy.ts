import { HttpService, HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, throwError } from 'rxjs';
import { NewParsed } from '../interfaces/newparsed.interface';
import { NYTParse } from 'src/parsers/nytapi.parse';
import { AxiosError } from 'axios';
import { catchError, map } from 'rxjs/operators';
import { NewStrategy } from '../interfaces/newstrategy.interface';

@Injectable()
export class NYTStrategy implements NewStrategy {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getNews(searchContent: string): Observable<NewParsed[]> {
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
}
