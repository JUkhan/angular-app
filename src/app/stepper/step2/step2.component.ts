import { Component, forwardRef, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { StepService } from '../step-service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
  providers: [{ provide: 'StepService', useExisting: forwardRef(() => Step2Component) }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step2Component implements OnInit, StepService {
  stepName = 'step2';
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
