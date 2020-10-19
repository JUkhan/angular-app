import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsRefreshComponent } from './news-refresh.component';

describe('NewsRefreshComponent', () => {
  let component: NewsRefreshComponent;
  let fixture: ComponentFixture<NewsRefreshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsRefreshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
