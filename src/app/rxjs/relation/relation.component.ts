import { HttpClient } from '@angular/common/http';
import { map, exhaustMap, startWith, tap, } from 'rxjs/operators';
import { StoreService } from './../services/store.service';
import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';


@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.scss']
})
export class RelationComponent implements OnInit {

  constructor(private store: StoreService, private http: HttpClient) { }
  refresh$ = this.store.actions.whereType('refresh').pipe(startWith({ type: 'start' }));
  camcel1$ = this.store.actions.whereType('cancel1').pipe(startWith({ type: 'start' }));
  camcel2$ = this.store.actions.whereType('cancel2').pipe(startWith({ type: 'start' }));
  camcel3$ = this.store.actions.whereType('cancel3').pipe(startWith({ type: 'start' }));

  request$ = this.refresh$.pipe(
    map(_ => `https://api.github.com/users?since=${Math.floor(Math.random() * 500)}`)
  );

  response$ = this.request$.pipe(
    exhaustMap(url => this.http.get(url))
  );
  can1$ = this.cancelstream(this.camcel1$);
  can2$ = this.cancelstream(this.camcel2$);
  can3$ = this.cancelstream(this.camcel3$);

  cancelstream(stream$): Observable<any> {
    return combineLatest([
      stream$,
      this.response$,
      (_, arr) => arr[Math.floor(Math.random() * arr.length)]
    ]);

  }

  ngOnInit(): void {

  }
  refresh(): void {
    this.store.dispatch('refresh');
  }
  cancel1(): void {
    this.store.dispatch('cancel1');
  }
  cancel2(): void {
    this.store.dispatch('cancel2');
  }
  cancel3(): void {
    this.store.dispatch('cancel3');
  }

}
