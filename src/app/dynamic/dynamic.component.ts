
import { WizardConfig } from './wizardcconfig';
import { Component, OnInit } from '@angular/core';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { FinalStepComponent } from './final-step/final-step.component';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {

  config: WizardConfig[] = [
    { stepName: 'Step One', active: true, componentType: Step1Component },
    { stepName: 'Step Two', componentType: Step2Component },
    { stepName: 'Final Step', componentType: FinalStepComponent }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
