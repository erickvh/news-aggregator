import { NYTNew } from 'src/interfaces/nytapi.interface';
import { NewParsed } from 'src/interfaces/newparsed.interface';

export function NYTParse(article: NYTNew): NewParsed {
  return {
    title: article.headline.main,
    author: article.byline.original || 'Anonymous',
    url: article.web_url,
    publishedAt: new Date(article.pub_date),
  };
}
