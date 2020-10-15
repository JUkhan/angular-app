import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reactive-form', loadChildren: () => import('./reactive-form/reactive-form.module').then(m => m.ReactiveFormModule) },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsModule) },
  { path: 'stepper', loadChildren: () => import('./stepper/stepper.module').then(m => m.StepperModule) },
  { path: 'dynamic', loadChildren: () => import('./dynamic/dynamic.module').then(m => m.DynamicModule) },
  { path: 'template', loadChildren: () => import('./template/template.module').then(m => m.TemplateModule) },
  { path: 'rxjs', loadChildren: () => import('./rxjs/rxjs.module').then(m => m.RxjsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//ng generate module customers --route customers --module app.module