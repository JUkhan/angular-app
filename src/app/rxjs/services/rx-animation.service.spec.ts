import { TestBed } from '@angular/core/testing';

import { RxAnimationService } from './rx-animation.service';

describe('RxAnimationService', () => {
  let service: RxAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
