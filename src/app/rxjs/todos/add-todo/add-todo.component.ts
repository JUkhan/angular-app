import { SubSink } from './../../services/subscriptionSink';
import { TodoActions, TodoService } from './../todoService';

import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoComponent implements OnInit, OnDestroy {
  subsink = new SubSink();
  constructor(private service: TodoService, private cd: ChangeDetectorRef) { }
  model = { description: '', completed: false };
  ngOnInit(): void {
    this.subsink.sink = this.service.store.actions.whereType(TodoActions.addEnd)
      .subscribe((e) => {
        this.model = { ...this.model, description: '' };
        this.cd.markForCheck();
      });
  }
  ngOnDestroy() {
    this.subsink.unsubscribe();
  }
  newTodo() {

    this.service.store.dispatch({ type: TodoActions.addTodo, payload: this.model });

  }

}
