import { HttpService, HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, throwError } from 'rxjs';
import { NewParsed } from '../interfaces/newparsed.interface';
import { parseGuardian } from 'src/parsers/guardian.parse';
import { AxiosError } from 'axios';
import { catchError, map } from 'rxjs/operators';
import { NewStrategy } from '../interfaces/newstrategy.interface';

@Injectable()
export class GuardianStrategy implements NewStrategy {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getNews(searchContent: string): Observable<NewParsed[]> {
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
}
