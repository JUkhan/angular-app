import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as faker from 'faker';

@Injectable()
export class NewsFeedInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req);
        if (req.url === '/newsfeed') {
            const response = new HttpResponse({
                body: generateRandomData()
            });
            return of(response)
                .pipe(
                    delay(1000)
                );
        }
        else if (req.url.startsWith('/todos')) {
            let response = null;
            if (req.method === 'GET') {
                response = new HttpResponse({
                    body: generateTodosData()
                });

            }
            else if (req.method === 'POST') {

                response = new HttpResponse({
                    body: { ...req.body, id: ++id }
                });
            }
            else if (req.method === 'PUT') {

                response = new HttpResponse({
                    body: { ...req.body }
                });
            }
            else if (req.method === 'DELETE') {
                console.log(req.url.substr(6));
                response = new HttpResponse({
                    body: +req.url.substr(7)
                });
            }
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
let id = 1;
export function generateTodosData() {
    return Array.from({ length: 5 }, () => ({
        id: ++id,
        description: faker.hacker.adjective() +
            ' ' + faker.hacker.noun(),
        completed: false
    }));
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
    return str.replace(/\w\S*/g, (txt: string) => txt[0].toUpperCase() + txt.substr(1));
}