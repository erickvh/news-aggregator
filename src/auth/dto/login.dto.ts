import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
