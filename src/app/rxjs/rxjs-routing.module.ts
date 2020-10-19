import { LatestNewsComponent } from './latest-news/latest-news.component';
import { CqrsComponent } from './cqrs/cqrs.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RxjsComponent } from './rxjs.component';
import { LatestNews2Component } from './latest-news2/latest-news2.component';

const routes: Routes = [
  {
    path: '', component: RxjsComponent, children: [
      { path: '', component: CqrsComponent },
      { path: 'cqrs', component: CqrsComponent },
      { path: 'latestnews', component: LatestNewsComponent },
      { path: 'latestnews2', component: LatestNews2Component }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RxjsRoutingModule { }
