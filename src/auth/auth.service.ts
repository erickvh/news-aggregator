import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  getToken(user: LoginDTO) {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findUserByUsername(username);
    const isHashEqual = await this.usersService.checkHash(
      password,
      user.password,
    );

    if (user && isHashEqual) {
      const authenticatedUser = {
        id: user.id,
        username: user.username,
      };
      return authenticatedUser;
    }

    return null;
  }
}
