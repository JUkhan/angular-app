import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutletComponent implements OnInit {

  @Input() options: any[];
  @Input() title = '';
  @ContentChild('optionTemplate') templateRef: TemplateRef<any>;
  constructor() { }

  ngOnInit(): void {
  }

}
