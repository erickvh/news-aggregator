import {
  Controller,
  ParseIntPipe,
  Param,
  Body,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CreateArticleDTO } from './dto/article.dto';
import { ArticlesServices } from './articles.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly articlesService: ArticlesServices) {}

  @Get(':id/articles')
  async getArticles(@Param('id', new ParseIntPipe()) id: number) {
    const articles = await this.articlesService.getUserArticles(id);
    return articles;
  }

  @Post(':id/articles')
  async saveArticle(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() createArticleDto: CreateArticleDTO,
  ) {
    const article = await this.articlesService.createArticle(
      createArticleDto.url,
      id,
    );
    return article;
  }
}
