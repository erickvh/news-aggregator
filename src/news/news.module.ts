import { Module, HttpModule } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';

@Module({ imports: [HttpModule], providers: [NewsService], controllers: [NewsController] })
export class NewsModule {}
