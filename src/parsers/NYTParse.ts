import { NYTNew } from 'src/interfaces/NYTNew';
import { NewParsed } from 'src/interfaces/NewParsed';

export function NYTParse(article: NYTNew): NewParsed {
  return {
    title: article.headline.main,
    author: article.byline.original || 'Anonymous',
    url: article.web_url,
    publishedAt: new Date(article.pub_date),
  };
}
