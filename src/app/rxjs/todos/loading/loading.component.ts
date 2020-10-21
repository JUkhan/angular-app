import { exhaustMap, map, repeat, takeUntil, tap, endWith } from 'rxjs/operators';
import { RxAnimationService } from './../../services/rx-animation.service';
import { TodoService, TodoActions } from './../todoService';
import { of, merge, Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent implements OnInit {

  constructor(private service: TodoService, private anim: RxAnimationService) { }

  rotate$: Observable<number>;

  ngOnInit(): void {
    const start$ = this.service.store.actions.whereTypes([TodoActions.loadtodos, TodoActions.addTodo,
    TodoActions.updateTodo, TodoActions.removeTodo]);
    const end$ = this.service.store.actions.whereTypes([TodoActions.loadEnd, TodoActions.addEnd,
    TodoActions.updateEnd, TodoActions.removeEnd]);
    this.rotate$ = start$.pipe(
      exhaustMap(() => this.anim.tween(0, 365, 500).pipe(
        repeat(),
        takeUntil(end$),
        endWith(0)
      )),
    );
  }

}
