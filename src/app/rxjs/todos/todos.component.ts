import { TodoService, TodoActions, TodoState, SearchCategory } from './todoService';
import { map, pluck } from 'rxjs/operators';
import { StoreService } from './../services/store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  constructor(public service: TodoService) { }

  ngOnInit(): void {

  }
}
