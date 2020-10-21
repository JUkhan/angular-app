import { TodoService } from './todos/todoService';
import { StoreService } from './services/store.service';
import { CqrsService } from './services/cqrs.service';
import { EventBus } from './services/event-bus';
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
import { TdtrComponent } from './tdtr/tdtr.component';
import { CqrsComponent } from './cqrs/cqrs.component';
import { FormsModule } from '@angular/forms';
import { LatestNews2Component } from './latest-news2/latest-news2.component';
import { NewsRefreshComponent } from './latest-news2/news-refresh/news-refresh.component';
import { NewsContainerComponent } from './latest-news2/news-container/news-container.component';
import { CounterComponent } from './counter/counter.component';
import { TodosComponent } from './todos/todos.component';
import { Counter2Component } from './counter2/counter2.component';
import { TodoItemComponent } from './todos/todo-item/todo-item.component';
import { TodoToolbarComponent } from './todos/todo-toolbar/todo-toolbar.component';
import { LoadingComponent } from './todos/loading/loading.component';
import { AddTodoComponent } from './todos/add-todo/add-todo.component';


@NgModule({
  declarations: [RxjsComponent, LatestNewsComponent, TouchDragToRefreshComponent, TdtrComponent, CqrsComponent, LatestNews2Component, NewsRefreshComponent, NewsContainerComponent, CounterComponent, TodosComponent, Counter2Component, TodoItemComponent, TodoToolbarComponent, LoadingComponent, AddTodoComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RxjsRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NewsFeedInterceptor, multi: true },
    NewsFeedService,
    EventBus,
    CqrsService,
    StoreService,
    RxAnimationService,
    TodoService,
  ]
})
export class RxjsModule { }
