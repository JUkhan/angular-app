import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestNews2Component } from './latest-news2.component';

describe('LatestNews2Component', () => {
  let component: LatestNews2Component;
  let fixture: ComponentFixture<LatestNews2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestNews2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestNews2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
