import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateArticleDTO {
  @IsNotEmpty()
  @IsUrl()
  readonly url: string;

  constructor(url: string) {
    this.url = url;
  }
}
