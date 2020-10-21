
import { map, mergeMap, startWith, scan, reduce, endWith, tap, filter, delay, withLatestFrom } from 'rxjs/operators';
import { merge, Subject, of, BehaviorSubject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-counter2',
  templateUrl: './counter2.component.html',
  styleUrls: ['./counter2.component.scss']
})
export class Counter2Component implements OnInit, OnDestroy {
  store$ = new BehaviorSubject<any>({ count: 0, loading: false });
  command$ = new Subject();
  subscription: Subscription;
  count$ = this.store$.pipe(
    map(a => a.loading ? 'loading...' : a.count)
  );
  constructor() {
    this.command$.pipe(
      filter(a => a === 'asyncInc'),
      delay(1000),
      map(a => 'inc')
    ).subscribe(this.command$);
  }


  ngOnInit(): void {
    this.subscription = this.command$.pipe(
      scan(this.reduce, this.store$.value)
    ).subscribe(this.store$);
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  reduce(state, action) {
    switch (action) {
      case 'inc':
        return { count: state.count + 1, loading: false };
      case 'dec':
        return { count: state.count - 1, loading: false };
      case 'asyncInc':
        return { count: state.count, loading: true };
      default: return state;
    }
  }
}
