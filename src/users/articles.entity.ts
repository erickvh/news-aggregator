import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { User } from './users.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(
    () => User,
    user => user.articles,
  )
  user: User;

  @Column()
  url: string;

  constructor(id: number, url: string) {
    this.id = id;
    this.url = url;
  }
}
