import { Component, forwardRef, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { StepService } from '../step-service';

@Component({
  selector: 'app-final-step',
  templateUrl: './final-step.component.html',
  styleUrls: ['./final-step.component.scss'],
  providers: [{ provide: 'StepService', useExisting: forwardRef(() => FinalStepComponent) }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinalStepComponent implements OnInit, StepService {
  stepName = 'final Step';
  @Input() active = false;
  constructor(private ref: ChangeDetectorRef) { }

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
