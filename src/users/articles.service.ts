import { Injectable } from '@nestjs/common';
import { Article } from './articles.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticlesServices {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  createArticle(url: string, userId: number) {
    return this.articleRepository.save({ url, user: { id: userId } });
  }

  getUserArticles(id: number) {
    return this.articleRepository.find({ where: { user: id } });
  }
}
