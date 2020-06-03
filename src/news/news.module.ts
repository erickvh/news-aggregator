import { Module, HttpModule } from '@nestjs/common';
import { NewsService } from './news.service';

@Module({ imports: [HttpModule], providers: [NewsService] })
export class NewsModule {}
