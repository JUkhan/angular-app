import { StepService } from './../step-service';
import { Component, forwardRef, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';


@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
  providers: [{ provide: 'StepService', useExisting: forwardRef(() => Step1Component) }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step1Component implements OnInit, StepService {

  message = 'hello step 1';
  @Input() active = false;
  constructor(private ref: ChangeDetectorRef) { }

  stepName = 'step1';
  show(): void {
    if (this.active) { return; }
    this.active = true;
    this.ref.detectChanges();
  }
  hide(): void {
    if (!this.active) { return; }
    this.active = false;
    this.ref.detectChanges();
  }

  ngOnInit(): void {
  }

}
