import { Controller, Post, Body } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';

@Controller('')
export class AuthController {
  @Post('register')
  async register(@Body() AuthDTO) {
    return 'algo';
  }
}
