import { HttpService, HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, throwError } from 'rxjs';
import { NewParsed } from '../interfaces/newparsed.interface';
import { NewsApiParse } from 'src/parsers/newsapi.parse';
import { AxiosError } from 'axios';
import { catchError, map } from 'rxjs/operators';
import { NewStrategy } from '../interfaces/newstrategy.interface';

@Injectable()
export class NewsAPIStrategy implements NewStrategy {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getNews(searchContent: string): Observable<NewParsed[]> {
    const apiKey = this.configService.get('NEWS_API_KEY');

    return this.httpService
      .get(
        `https://newsapi.org/v2/everything?q=${searchContent}&apiKey=${apiKey}`,
      )
      .pipe(
        map(response => response.data.articles.map(NewsApiParse)),
        catchError((err: AxiosError) => {
          if (err.response) {
            return throwError(
              new HttpException(err.message, err.response.status),
            );
          }
          return throwError(err);
        }),
      );
  }
}
