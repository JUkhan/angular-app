import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepperRoutingModule } from './stepper-routing.module';
import { StepperComponent } from './stepper.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { FinalStepComponent } from './final-step/final-step.component';
import { StepSelectorDirective } from './step-selector.directive';


@NgModule({
  declarations: [StepperComponent, Step1Component, Step2Component, FinalStepComponent, StepSelectorDirective],
  imports: [
    CommonModule,
    StepperRoutingModule
  ]
})
export class StepperModule { }
