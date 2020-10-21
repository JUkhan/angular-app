import { TodoService, TodoActions } from './../todoService';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  @Input() todo;
  isDblclick = false;
  constructor(private service: TodoService) { }

  ngOnInit(): void {
  }
  removeTodo(): void {
    this.service.store.dispatch(TodoActions.removeTodo, this.todo.id);
  }
  updateTodo(): void {
    this.service.store.dispatch(TodoActions.updateTodo, this.todo);
  }
}
