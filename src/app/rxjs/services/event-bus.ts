import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
export interface EmitEvent<T = any> {
    action: any;
    payload?: T;
}
@Injectable()
export class EventBus {
    private sub = new Subject<EmitEvent>();
    emit(event: EmitEvent): void {
        this.sub.next(event);
    }
    on(action, observer): Subscription {
        return this.sub.pipe(
            filter(e => e.action === action),
            map(e => e.payload)
        ).subscribe(observer);
    }
}