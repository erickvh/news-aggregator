import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { parseGuardian } from 'src/parsers/guardianParse';
import { NYTParse } from 'src/parsers/NYTParse';

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
      .pipe(map(response => response.data.response.results.map(parseGuardian)));
  }

  getNYTimesArticles(searchContent: string) {
    const apiKey = this.configService.get('API_KEY_NYT');
    const filterNewest = 'sort=newest';

    return this.httpService
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${searchContent}&filter&${filterNewest}`,
      )
      .pipe(map(response => response.data.response.docs.map(NYTParse)));
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
