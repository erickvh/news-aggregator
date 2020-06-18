import { NewStrategy } from '../interfaces/newstrategy.interface';
import { Observable } from 'rxjs';
import { NewParsed } from '../interfaces/newparsed.interface';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class StrategyContext {
  private newStrategy: NewStrategy;

  setNewStrategy(newStrategy: NewStrategy): void {
    this.newStrategy = newStrategy;
  }

  getNewStrategy(textSearch: string): Observable<NewParsed[]> {
    return this.newStrategy.getNews(textSearch);
  }
}
