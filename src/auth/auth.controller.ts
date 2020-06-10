import {
  Controller,
  Post,
  Body,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';

@Controller('')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() authDTO: AuthDTO) {
    try {
      return await this.usersService.createUser(authDTO);
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }
}
