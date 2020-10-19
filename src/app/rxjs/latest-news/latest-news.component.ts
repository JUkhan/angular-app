import { StoreService, NewsAction } from './../services/store.service';
import { EventBus } from './../services/event-bus';
import { NewsFeedService } from './../services/news-feed.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit, OnDestroy {

  constructor(public newsfeed: NewsFeedService, private eventBus: EventBus, private store: StoreService) { }
  subscription: Subscription;
  news$ = this.newsfeed.news$;
  refreshTime$ = timer(0, 30000);
  ngOnInit(): void {
    this.subscription = this.refreshTime$.subscribe(() => this.refresh());
    this.eventBus.on('test', e => console.log(e));
    this.eventBus.emit({ action: 'test', payload: 'hi there' });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  refresh() {
    this.store.dispatch(NewsAction.Refresh)
  }

}
