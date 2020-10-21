import { Subscription } from 'rxjs';
export class SubSink {
    private sub = new Subscription();
    set sink(subscription: Subscription) {
        this.sub.add(subscription);
    }
    unsubscribe(): void {
        this.sub.unsubscribe();
    }
}