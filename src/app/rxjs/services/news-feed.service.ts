import { StoreService, NewsAction } from './store.service';
import { exhaustMap, catchError, share } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';

@Injectable()
export class NewsFeedService {

  loadNews$ = this.http.get('/newsfeed').pipe(
    catchError(err => {
      console.log('err loading news feed');
      console.error(err);
      return EMPTY;
    }),
    share()
  );

  refresh$ = this.store.actions.whereType(NewsAction.Refresh);

  news$ = this.refresh$.pipe(
    exhaustMap(e => this.loadNews$)
  );

  constructor(private http: HttpClient, private store: StoreService) { }
}
