import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ length: 40, unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ length: 128, unique: true })
  email: string;

  @Column()
  name: string;

  constructor(
    id: number,
    username: string,
    password: string,
    email: string,
    name: string,
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.name = name;
  }
}
