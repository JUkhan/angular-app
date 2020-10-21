import { map } from 'rxjs/operators';
import { CounterActions } from './../actionTypes';
import { StoreService } from './../services/store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  constructor(private store: StoreService) { }
  count$ = this.store.select('counter').pipe(map(c => c.loading ? 'loading...' : c.count));

  ngOnInit(): void {
    this.store.registerState({
      stateName: 'counter',
      initialState: { count: 0, loading: false },
      mapActionToState: (state, action, emit) => {
        switch (action.type) {
          case CounterActions.Inc:
            emit({ loading: false, count: state.count + 1 });
            break;
          case CounterActions.Dec:
            emit({ loading: false, count: state.count - 1 });
            break;
          case CounterActions.AsyncInc:
            emit({ ...state, loading: true });
            setTimeout(() => {
              this.increment();
            }, 1000);
            break;
        }
      }
    });
  }

  increment() {
    this.store.dispatch(CounterActions.Inc);
  }
  decrement() {
    this.store.dispatch(CounterActions.Dec);
  }
  asyncIncrement() {
    this.store.dispatch(CounterActions.AsyncInc);
  }

}
