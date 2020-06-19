import { Injectable, BadRequestException } from '@nestjs/common';
import { map, reduce } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';
import { NewParsed } from 'src/news/interfaces/newparsed.interface';
import { NewStrategy } from './interfaces/newstrategy.interface';
import { GuardianStrategy } from './strategies/guardian.strategy';
import { NYTStrategy } from './strategies/nytapi.strategy';
import { NewsAPIStrategy } from './strategies/newsapi.strategy';
import { StrategyContext } from './strategies/context.strategy';

@Injectable()
export class NewsService {
  constructor(
    private readonly guardianStrategy: GuardianStrategy,
    private readonly nytStrategy: NYTStrategy,
    private readonly newsApiStrategy: NewsAPIStrategy,
    private readonly strategyContext: StrategyContext,
  ) {}

  private providerRouter = new Map()
    .set('guardian', this.guardianStrategy)
    .set('nyt', this.nytStrategy)
    .set('newsapi', this.newsApiStrategy);

  RouteSourceStrategy(
    searchContent: string,
    source: string,
  ): Observable<NewParsed[]> {
    if (!source)
      return this.mergeNews(searchContent, ...this.providerRouter.values());

    if (!this.providerRouter.has(source)) {
      const optionsAvailable = [...this.providerRouter.keys()].join(',');
      throw new BadRequestException(
        `Not a valid source, valid sources: ${optionsAvailable}`,
      );
    }

    return this.getStrategyNews(searchContent, this.providerRouter.get(source));
  }

  // get articles by context strategy
  getStrategyNews(
    searchContent: string,
    strategy: NewStrategy,
  ): Observable<NewParsed[]> {
    this.strategyContext.setNewStrategy(strategy);
    return this.strategyContext.getNewStrategy(searchContent);
  }

  mergeNews(
    searchContent: string,
    ...newsStrategies: NewStrategy[]
  ): Observable<NewParsed[]> {
    const observables = newsStrategies.map(strategy => {
      return this.getStrategyNews(searchContent, strategy);
    });

    return merge(...observables).pipe(
      reduce((newsAggregated, newsStream) => [
        ...newsAggregated,
        ...newsStream,
      ]),
      map(news =>
        news.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()),
      ),
    );
  }
}
