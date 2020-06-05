import { GuardianNew } from '../interfaces/GuardianNew';
import { NewParsed } from '../interfaces/NewParsed';

export function parseGuardian(article: GuardianNew): NewParsed {
  let author = 'Anonymous';

  if (article.fields) {
    author = article.fields.byline || 'Anonymous';
  }

  return {
    title: article.webTitle,
    author,
    url: article.webUrl,
    publishedAt: new Date(article.webPublicationDate),
  };
}
