import { logging } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AjwahStore } from 'ajwah-store/lib';
import { EMPTY } from 'rxjs';
import { catchError, share } from 'rxjs/operators';

export enum NewsAction {
  Loading = 'news-loading', Refresh = 'news-refresh', Loaded = 'news-loaded'
}

@Injectable()
export class StoreService extends AjwahStore {
  constructor(private http: HttpClient) {
    super();
  }
}
