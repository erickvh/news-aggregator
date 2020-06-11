import {
  Injectable,
  HttpService,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, catchError, reduce } from 'rxjs/operators';
import { parseGuardian } from 'src/parsers/guardianParse';
import { NYTParse } from 'src/parsers/NYTParse';
import { throwError, merge, Observable } from 'rxjs';
import { AxiosError } from 'axios';
import { NewParsed } from 'src/interfaces/NewParsed';
import { NewsApiParse } from 'src/parsers/NewsApiParse';

@Injectable()
export class NewsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getGuardianArticles(searchContent: string): Observable<NewParsed[]> {
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

  getNYTimesArticles(searchContent: string): Observable<NewParsed[]> {
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

  getNewsApiArticles(searchContent: string) {
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
  getAggregatedNews(searchContent: string): Observable<NewParsed[]> {
    const guardianObservable = this.getGuardianArticles(searchContent);
    const nytObservable = this.getNYTimesArticles(searchContent);
    const newsApiObservable = this.getNewsApiArticles(searchContent);
    return merge(guardianObservable, nytObservable, newsApiObservable).pipe(
      reduce((newsAggregated, newsStream) => [
        ...newsAggregated,
        ...newsStream,
      ]),
      map(news =>
        news.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()),
      ),
    );
  }
  getArticles(searchContent: string, source: string): Observable<NewParsed[]> {
    if (!source) return this.getAggregatedNews(searchContent);

    switch (source) {
      case 'nyt':
        return this.getNYTimesArticles(searchContent);
        break;
      case 'guardian':
        return this.getGuardianArticles(searchContent);
        break;
      case 'newsapi':
        return this.getNewsApiArticles(searchContent);
      default:
        throw new BadRequestException('Provider not available');
    }
  }
}
