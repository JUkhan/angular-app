
import { TodoService, TodoActions, SearchCategory } from './../todoService';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-toolbar',
  templateUrl: './todo-toolbar.component.html',
  styleUrls: ['./todo-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoToolbarComponent implements OnInit {

  constructor(public service: TodoService) { }

  ngOnInit(): void {
  }
  all(): void {
    this.service.store.dispatch(TodoActions.searchCategory, SearchCategory.all);
  }
  active(): void {
    this.service.store.dispatch(TodoActions.searchCategory, SearchCategory.active);
  }
  completed(): void {
    this.service.store.dispatch(TodoActions.searchCategory, SearchCategory.completed);
  }
}
