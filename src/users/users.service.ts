import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { hash, compare } from 'bcrypt';
@Injectable()
export class UsersService {
  private salt = 10;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: AuthDTO): Promise<User> {
    user.password = await this.getHash(user.password);
    return this.userRepository.save(user);
  }

  saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  getHash(password: string | undefined): Promise<string> {
    return hash(password, this.salt);
  }

  checkHash(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }

  findUserByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
