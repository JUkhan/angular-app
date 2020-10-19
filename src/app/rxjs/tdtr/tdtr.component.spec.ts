import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdtrComponent } from './tdtr.component';

describe('TdtrComponent', () => {
  let component: TdtrComponent;
  let fixture: ComponentFixture<TdtrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdtrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
