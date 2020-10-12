import { TabComponent } from './../tab/tab.component';
import { TabsService } from './../tab-service';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, OnInit, QueryList } from '@angular/core';

@Component({
  selector: 'app-jtabs',
  templateUrl: './jtabs.component.html',
  styleUrls: ['./jtabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JtabsComponent implements OnInit, AfterContentInit {
  tabServices: TabsService[] = [];
  activeTab: TabsService;
  constructor() { }

  @ContentChildren(TabComponent, { read: 'TabService' }) tabs: QueryList<TabsService>;
  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.tabServices = this.tabs.toArray();
    this.activeTab = this.tabServices.find(s => s.active);
  }
  selectTab(tab: TabsService): void {
    this.activeTab.active = false;
    tab.active = true;
    this.activeTab = tab;

  }
}
