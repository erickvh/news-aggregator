import {
  Controller,
  Post,
  Body,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() authDTO: AuthDTO) {
    try {
      return await this.usersService.createUser(authDTO);
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  login(@Body() loginDTO: LoginDTO) {
    return 'response';
  }
}
