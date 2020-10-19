import { NewsFeedService } from './../services/news-feed.service';
import { RxAnimationService } from './../services/rx-animation.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { concat, fromEvent, defer, of } from 'rxjs';
import { exhaustMap, map, takeUntil, tap, startWith, repeat, takeWhile, endWith } from 'rxjs/operators';

@Component({
  selector: 'app-tdtr',
  templateUrl: './tdtr.component.html',
  styleUrls: ['./tdtr.component.scss']
})
export class TdtrComponent implements OnInit {
  constructor(public animate: RxAnimationService, public newsfeed: NewsFeedService) { }
  @Output() refresh = new EventEmitter();
  private _pos = 0;
  touchStart$ = fromEvent<TouchEvent>(document, 'touchstart');
  touchMove$ = fromEvent<TouchEvent>(document, 'touchmove');
  touchEnd$ = fromEvent<TouchEvent>(document, 'touchend');

  touchDrag$ = this.touchStart$.pipe(
    exhaustMap(start => concat(this.touchMove$.pipe(
      map(end => end.touches[0].clientY - start.touches[0].clientY),
      tap(y => this._pos = y),
      takeUntil(this.touchEnd$)
    ),
      this.moveHome$
    )
    ),
    tap(y => {
      if (y > window.innerHeight / 2) {
        this.refresh.emit();
      }
    }),
    takeWhile(y => y < window.innerHeight / 2)
  );
  moveHome$ = defer(() => this.animate.tween(this._pos, 0, 200));
  moveHomeAfterLoad$ = this.newsfeed.loadNews$.pipe(
    exhaustMap(s => this.moveHome$)
  );
  updatePosition$ = concat(
    this.touchDrag$,
    this.moveHomeAfterLoad$
  ).pipe(
    tap(s => console.log('before-----repeat---->>>>>>>')),
    repeat()
  );
  position$ = this.updatePosition$.pipe(
    startWith(0),
    map(y => y - 70)
  );

  rotate$ = this.newsfeed.refresh$.pipe(
    exhaustMap(s => this.animate.tween(0, 365, 500).pipe(
      repeat(),
      takeUntil(this.newsfeed.loadNews$),
    )),
    endWith(0)
  );

  transformRotate$ = this.rotate$.pipe(
    map(r => `rotate(${r}deg)`)
  );


  transformPosition$ = this.position$.pipe(
    map(y => `translate3d(-35px, ${y}px, 0)`)
  );


  ngOnInit(): void {

  }

}
