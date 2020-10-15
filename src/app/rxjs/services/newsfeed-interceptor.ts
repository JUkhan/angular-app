import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as faker from 'faker';
@Injectable()
export class NewsFeedInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url === '/newsfeed') {
            const response = new HttpResponse({
                body: generateRandomData()
            });
            return of(response)
                .pipe(
                    delay(1000)
                );
        }
        else { return next.handle(req); }
    }
}
export function generateRandomData() {
    return Array.from({ length: 20 }, generateRandomDataItem);
}

export function generateRandomDataItem() {
    return {
        author: faker.name.findName(),
        date: faker.date.recent(),
        title: capitalizeTitle(
            faker.hacker.adjective() +
            ' ' + faker.hacker.noun() +
            ' ' + faker.hacker.ingverb() +
            ' ' + faker.hacker.noun()
        ),
        contentSample: faker.lorem.paragraph(3),
    };
}

function capitalizeTitle(str: string): string {
    return str.replace(/\w\S*/g, (txt: string) => txt[0].toUpperCase() + txt.substr(1))
}