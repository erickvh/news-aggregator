import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { NytGuard } from 'src/guards/nyt.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @UseGuards(NytGuard)
  searchArticles(
    @Query('q') textContent: string,
    @Query('source') source: string,
  ) {
    return this.newsService.getArticles(textContent, source);
  }
}
