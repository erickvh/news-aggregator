import { Controller, ParseIntPipe, Param, Body, Post } from '@nestjs/common';
import { CreateArticleDTO } from './dto/article.dto';
import { UsersService } from './users.service';
import { ArticlesServices } from './articles.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly articlesService: ArticlesServices,
  ) {}

  @Post(':id/articles')
  async saveArticle(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() createArticleDto: CreateArticleDTO,
  ) {
    const article = await this.articlesService.createArticle(
      createArticleDto.url,
    );
    return article;
  }
}
