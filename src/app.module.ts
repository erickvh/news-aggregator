import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Article } from './users/articles.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        port: configService.get<number>('PORT_DB'),
        username: configService.get('USER_DB'),
        password: configService.get('PASSWORD_DB'),
        database: configService.get('NAME_DB'),
        host: configService.get('HOST_DB'),
        synchronize: true,
        entities: [User, Article],
      }),
    }),
    NewsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
