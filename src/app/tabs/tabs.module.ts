import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab/tab.component';
import { JtabsComponent } from './jtabs/jtabs.component';


@NgModule({
  declarations: [TabsComponent, TabComponent, JtabsComponent],
  imports: [
    CommonModule,
    TabsRoutingModule
  ]
})
export class TabsModule { }
