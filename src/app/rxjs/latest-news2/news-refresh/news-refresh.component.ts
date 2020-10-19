import { NewsFeedService } from './../../services/news-feed.service';
import { RxAnimationService } from './../../services/rx-animation.service';
import { exhaustMap, map, tap, takeUntil, takeWhile, repeat, filter, endWith, startWith, pluck, flatMap, delay } from 'rxjs/operators';
import { fromEvent, of, concat, defer, NEVER, timer } from 'rxjs';
import { StoreService, NewsAction } from './../../services/store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-refresh',
  templateUrl: './news-refresh.component.html',
  styleUrls: ['./news-refresh.component.scss']
})
export class NewsRefreshComponent implements OnInit {

  constructor(private store: StoreService, private news: NewsFeedService, private anim: RxAnimationService) { }

  touchStart$ = fromEvent<TouchEvent>(document, 'touchstart');
  touchMove$ = fromEvent<TouchEvent>(document, 'touchmove');
  touchEnd$ = fromEvent<TouchEvent>(document, 'touchend');

  pos = 0;
  touchDrag$ = this.touchStart$.pipe(
    exhaustMap(start => {
      console.log(start.touches[0].pageY);
      return concat(
        this.touchMove$.pipe(
          map(move => move.touches[0].pageY - start.touches[0].pageY),
          takeUntil(this.touchEnd$),
          tap(p => this.pos = p),
        ),
        this.moveHome$,
      );
    }),
    tap(y => {

      if (y > window.innerHeight / 2) {
        this.store.dispatch(NewsAction.Refresh);
      }
    }),
    takeWhile(y => y <= window.innerHeight / 2),

  );

  moveHome$ = defer(() => this.anim.tween(this.pos, 0, 200));

  moveHomeAfterLoad$ = this.news.loadNews$.pipe(
    exhaustMap(() => this.moveHome$),
  );

  positionUpdate$ = concat(
    this.touchDrag$,
    this.moveHomeAfterLoad$
  ).pipe(
    repeat()
  );

  position$ = this.positionUpdate$.pipe(
    startWith(0),
    map(y => y - 70)
  );
  transformPosition$ = this.position$.pipe(
    map(y => `translate3d(-35px, ${y}px, 0)`)
  );

  rotate$ = this.news.refresh$.pipe(
    exhaustMap(() => this.anim.tween(0, 360, 500).pipe(
      repeat(),
      takeUntil(this.news.loadNews$),
      x => concat(x, of(0)), // endWith(0)
    ))
  );


  transformRotate$ = this.rotate$.pipe(
    map(r => `rotate(${r}deg)`)
  );

  ngOnInit(): void {

  }

}
