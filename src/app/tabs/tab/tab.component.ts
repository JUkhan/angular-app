import { TabsService } from './../tab-service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  providers: [{ provide: 'TabService', useExisting: forwardRef(() => TabComponent) }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit, TabsService {

  constructor(private cd: ChangeDetectorRef) { }

  private mActive = false;
  @Input() label = '';

  get active(): boolean {
    return this.mActive;
  }
  @Input() set active(val) {
    this.mActive = val;
    this.flush();
  }

  ngOnInit(): void {
  }
  flush(): void {
    this.cd.detectChanges();
  }
}
