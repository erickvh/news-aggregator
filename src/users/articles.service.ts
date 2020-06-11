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

  createArticle(url: string) {
    return this.articleRepository.save({ url });
  }
}
