import { Module, HttpModule } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { StrategyContext } from './strategies/context.strategy';
import { GuardianStrategy } from './strategies/guardian.strategy';
import { NYTStrategy } from './strategies/nytapi.strategy';
import { NewsAPIStrategy } from './strategies/newsapi.strategy';

@Module({
  imports: [HttpModule],
  providers: [
    NewsService,
    NewsAPIStrategy,
    StrategyContext,
    GuardianStrategy,
    NYTStrategy,
  ],
  controllers: [NewsController],
})
export class NewsModule {}
