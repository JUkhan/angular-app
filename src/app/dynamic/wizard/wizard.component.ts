import { WizardConfig } from './../wizardcconfig';
import { AfterViewInit, ChangeDetectionStrategy, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardComponent implements OnInit, AfterViewInit {

  @Input() config: WizardConfig[] = [];
  constructor(private cr: ComponentFactoryResolver) { }


  @ViewChild('vcr', { read: ViewContainerRef }) vcr: ViewContainerRef;
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.loadComponent();
  }
  prev(): void {
    const index = this.activeStepIndex;
    if (index > 0) {
      this.reduceAndLoadComponent(index - 1);
    }
  }

  next(): void {
    const index = this.activeStepIndex;
    if (index < this.config.length - 1) {
      this.reduceAndLoadComponent(index + 1);
    }
  }
  private reduceAndLoadComponent(index: number): void {
    this.config = this.config.reduce(
      (prev, curr, i, arr) => {
        if (index === i) {
          curr.active = true;
        }
        else {
          curr.active = false;
        }
        prev.push(curr);
        return prev;
      }, []);
    this.loadComponent();
  }

  get activeStepIndex(): number {
    return this.config.findIndex(e => e.active);
  }
  loadComponent(): void {
    const item = this.config.find(e => e.active);
    if (item) {
      const fac = this.cr.resolveComponentFactory(item.componentType);
      this.vcr.clear();
      const comRef = this.vcr.createComponent(fac);

    }
  }
}
