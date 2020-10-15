import { RxAnimationService } from './services/rx-animation.service';
import { NewsFeedService } from './services/news-feed.service';
import { NewsFeedInterceptor } from './services/newsfeed-interceptor';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RxjsRoutingModule } from './rxjs-routing.module';
import { RxjsComponent } from './rxjs.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { TouchDragToRefreshComponent } from './touch-drag-to-refresh/touch-drag-to-refresh.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [RxjsComponent, LatestNewsComponent, TouchDragToRefreshComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RxjsRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NewsFeedInterceptor, multi: true },
    NewsFeedService,
    RxAnimationService
  ]
})
export class RxjsModule { }
