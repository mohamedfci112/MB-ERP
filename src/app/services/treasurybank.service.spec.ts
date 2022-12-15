import { TestBed } from '@angular/core/testing';

import { TreasurybankService } from './treasurybank.service';

describe('TreasurybankService', () => {
  let service: TreasurybankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreasurybankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
