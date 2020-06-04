import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get()
  searchArticles(
    @Query('q') textContent: string,
    @Query('source') source: string,
  ) {
    return this.newsService.getArticles(textContent, source);
  }
}
