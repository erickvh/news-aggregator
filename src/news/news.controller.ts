import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { AuthGuard } from '@nestjs/passport';
import { EmptysearchPipe } from 'src/emptysearch.pipe';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  searchArticles(
    @Query('q', EmptysearchPipe) textContent: string,
    @Query('source') source: string,
  ) {
    return this.newsService.getArticles(textContent, source);
  }
}
