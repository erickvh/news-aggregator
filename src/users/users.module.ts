import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Article } from './articles.entity';
import { ArticlesServices } from './articles.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Article])],
  controllers: [UsersController],
  providers: [UsersService, ArticlesServices],
  exports: [UsersService],
})
export class UsersModule {}
