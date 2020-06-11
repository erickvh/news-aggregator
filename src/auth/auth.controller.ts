import {
  Controller,
  Post,
  Body,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

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
  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.getToken(loginDTO);
  }
}
