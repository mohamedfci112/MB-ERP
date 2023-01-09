import { TestBed } from '@angular/core/testing';

import { SnadatService } from './snadat.service';

describe('SnadatService', () => {
  let service: SnadatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnadatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
