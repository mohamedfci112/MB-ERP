import { TestBed } from '@angular/core/testing';

import { DepartsService } from './departs.service';

describe('DepartsService', () => {
  let service: DepartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
