import { NewsFeedService } from './../../services/news-feed.service';
import { map } from 'rxjs/operators';
import { StoreService, NewsAction } from './../../services/store.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-news-container',
  templateUrl: './news-container.component.html',
  styleUrls: ['./news-container.component.scss']
})
export class NewsContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(public store: StoreService, private newsfeed: NewsFeedService) { }
  news$ = this.newsfeed.news$;
  refreshNews$ = timer(0, 30000);
  ngOnInit(): void {
    this.subscription = this.refreshNews$.subscribe(() => {
      this.store.dispatch(NewsAction.Refresh);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
