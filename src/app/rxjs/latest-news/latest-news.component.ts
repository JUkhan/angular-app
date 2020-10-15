import { NewsFeedService } from './../services/news-feed.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit, OnDestroy {

  constructor(public newsfeed: NewsFeedService) { }
  subscription: Subscription;
  news$ = this.newsfeed.news$;
  refreshTime$ = timer(0, 3000);
  ngOnInit(): void {
    this.subscription = this.refreshTime$.subscribe(this.newsfeed.refresh$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
