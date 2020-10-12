import { StepSelectorDirective } from './step-selector.directive';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { StepService } from './step-service';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, AfterViewInit {
  activeIndex = 0;
  steps = [{ title: 'Step1', active: true }, { title: 'Step2', active: false }, { title: 'Final Step', active: false }];
  constructor(private cd: ChangeDetectorRef) { }

  //@ViewChildren(StepSelectorDirective, { read: 'StepService',  })
  //steps: QueryList<StepService>;
  //stepList: StepService[] = [];
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    //this.stepList = this.steps.toArray();
    //this.stepList[this.activeIndex].show();
    //this.active = true;
    //this.cd.detectChanges();
  }
  next(): void {
    const prev = this.activeIndex;
    this.activeIndex++;
    if (this.activeIndex > 2) {
      this.activeIndex = 2;
    }
    this.setState(prev);
  }
  private setState(prev: number): void {
    this.steps[prev] = { ...this.steps[prev], active: false };
    this.steps[this.activeIndex] = { ...this.steps[this.activeIndex], active: true };
  }

  prev(): void {
    const prev = this.activeIndex;
    this.activeIndex--;
    if (this.activeIndex < 0) {
      this.activeIndex = 0;
    }
    this.setState(prev);
  }
}
