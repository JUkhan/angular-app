import { catchError, share, pluck, map } from 'rxjs/operators';
import { StoreService } from './../services/store.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';


export enum TodoActions {
    loadtodos = 'todos-loadtodo',
    loadEnd = 'todos-loaded',
    addTodo = 'todos-add',
    addEnd = 'todos-added',
    updateTodo = 'todos-update',
    updateEnd = 'todos-update-end',
    removeTodo = 'todos-remove',
    removeEnd = 'todos-remove-end',
    searchCategory = 'todos-search-category'
}
export enum SearchCategory {
    all = 1, active, completed
}
export interface TodoModel {
    id: number;
    description: string;
    completed: boolean;
}
export interface TodoState {
    todos: TodoModel[];
    searchCategory: SearchCategory;
}

@Injectable()
export class TodoService {

    constructor(private http: HttpClient, public store: StoreService) {
        this.registerTodos();
        this.store.dispatch(TodoActions.loadtodos);

    }
    todos$ = this.store.select<TodoState>('todos').pipe(
        map(state => {
            switch (state.searchCategory) {
                case SearchCategory.active:
                    return state.todos.filter(todo => !todo.completed);
                case SearchCategory.completed:
                    return state.todos.filter(todo => todo.completed);
                default:
                    return state.todos;
            }
        })
    );
    searchCategory$ = this.store.select('todos').pipe(pluck('searchCategory'));
    activeItem$ = this.store.select('todos').pipe(
        pluck('todos'),
        map(arr => arr.filter(todo => !todo.completed)),
        map(arr => `${arr.length} items left`),
    );
    loadTodos$ = this.http.get('/todos').pipe(
        catchError(err => {
            console.error(err);
            return EMPTY;
        }),
        share()
    );

    addTodo(todo): Observable<any> {
        return this.http.post('/todos', todo).pipe(
            catchError(err => {
                console.error(err);
                return EMPTY;
            })
        );
    }
    updateTodo(todo): Observable<any> {
        return this.http.put('/todos/' + todo.id, todo).pipe(
            catchError(err => {
                console.error(err);
                return EMPTY;
            })
        );
    }
    removeTodo(id): Observable<any> {
        return this.http.delete('/todos/' + id).pipe(
            catchError(err => {
                console.error(err);
                return EMPTY;
            })
        );
    }


    registerTodos(): void {

        this.store.registerState({
            stateName: 'todos',
            initialState: { todos: [], searchCategory: SearchCategory.all },
            mapActionToState: (state, action, emit) => {
                switch (action.type) {
                    case TodoActions.loadEnd:
                        emit({ ...state, todos: action.payload });
                        break;
                    case TodoActions.loadtodos:
                        this.loadTodos$.subscribe(res => this.store.dispatch(TodoActions.loadEnd, res));
                        break;
                    case TodoActions.addEnd:
                        emit({ ...state, todos: [action.payload, ...state.todos] });
                        break;
                    case TodoActions.addTodo:
                        this.addTodo(action.payload).subscribe(res => this.store.dispatch(TodoActions.addEnd, res));
                        break;
                    case TodoActions.updateEnd:
                        emit({
                            ...state, todos: state.todos.reduce((acc, todo) => {
                                acc.push(todo.id === action.payload.id ? action.payload : todo);
                                return acc;
                            }, [])
                        });
                        break;
                    case TodoActions.updateTodo:
                        this.updateTodo(action.payload).subscribe(res => this.store.dispatch(TodoActions.updateEnd, res));
                        break;
                    case TodoActions.removeEnd:
                        emit({ ...state, todos: state.todos.filter(todo => todo.id !== action.payload) });
                        break;
                    case TodoActions.removeTodo:
                        this.removeTodo(action.payload).subscribe(res => this.store.dispatch(TodoActions.removeEnd, res));
                        break;
                    case TodoActions.searchCategory:
                        emit({ ...state, searchCategory: action.payload });
                        break;
                }
            }
        });


    }
}