import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-final-step',
  templateUrl: './final-step.component.html',
  styleUrls: ['./final-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinalStepComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
