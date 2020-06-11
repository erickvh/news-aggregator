import { IsString, IsNotEmpty } from 'class-validator';

export class AuthDTO {
  constructor(username: string, password: string, email: string, name: string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.name = name;
  }

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
