import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicRoutingModule } from './dynamic-routing.module';
import { DynamicComponent } from './dynamic.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { FinalStepComponent } from './final-step/final-step.component';
import { WizardComponent } from './wizard/wizard.component';


@NgModule({
  declarations: [DynamicComponent, Step1Component, Step2Component, FinalStepComponent, WizardComponent],
  imports: [
    CommonModule,
    DynamicRoutingModule
  ]
})
export class DynamicModule { }
