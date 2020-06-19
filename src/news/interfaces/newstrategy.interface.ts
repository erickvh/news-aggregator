import { Observable } from 'rxjs';
import { NewParsed } from './newparsed.interface';

export interface NewStrategy {
  getNews(textSearch: string): Observable<NewParsed[]>;
}
