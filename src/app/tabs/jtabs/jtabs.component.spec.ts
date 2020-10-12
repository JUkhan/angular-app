import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JtabsComponent } from './jtabs.component';

describe('JtabsComponent', () => {
  let component: JtabsComponent;
  let fixture: ComponentFixture<JtabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JtabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JtabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
