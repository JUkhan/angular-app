import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { pluck, scan, tap } from 'rxjs/operators';

export interface CqrsState {
    count?: number;
    ticker?: boolean;
    countDown?: boolean;
    diff?: number;
}

@Injectable()
export class CqrsService {
    private sub = new BehaviorSubject<CqrsState>({ count: 0, ticker: false, diff: 1, countDown: false });
    state$: Observable<CqrsState> = this.sub.pipe(
        tap(console.log),
        scan((acc, state) => ({ ...acc, ...state })),
        tap(console.log)
    );
    command(state: CqrsState): void {
        this.sub.next(state);
    }
    query<T = any>(...props: string[]): Observable<T> {
        return this.state$.pipe(
            pluck(...props)
        );
    }
}