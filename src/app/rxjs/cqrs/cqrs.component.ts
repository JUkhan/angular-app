import { shareReplay, map, switchMap, tap, pluck, startWith, mapTo } from 'rxjs/operators';
import { NEVER, Subscription, timer } from 'rxjs';
import { CqrsService } from './../services/cqrs.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-cqrs',
  templateUrl: './cqrs.component.html',
  styleUrls: ['./cqrs.component.scss']
})
export class CqrsComponent implements OnInit, OnDestroy {
  subsink: Subscription;

  //CQRS: command query responsibility segregation
  constructor(public cqrs: CqrsService) { }
  resetValue = 10;
  count$ = this.cqrs.state$.pipe(

    switchMap(state => {
      return state.ticker ? timer(0, 1000).pipe(
        map(s => {

          return ({ count: state.countDown ? --state.count : ++state.count });
        })

      ) : NEVER
    }),
    pluck('count'),
    startWith(0)
  );
  ngOnInit(): void {

  }
  ngOnDestroy() {
    this.subsink?.unsubscribe();
  }

  start() {
    this.cqrs.command({ ticker: true });
  }

  stop() {
    this.cqrs.command({ ticker: false });
  }
  reset() {
    this.cqrs.command({ count: this.resetValue });
  }
  countDown() {
    this.cqrs.command({ countDown: true });
  }
  countInc() {
    this.cqrs.command({ countDown: false });
  }

}
