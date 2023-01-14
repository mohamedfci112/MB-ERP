import { TestBed } from '@angular/core/testing';

import { MosdadCustomersService } from './mosdad-customers.service';

describe('MosdadCustomersService', () => {
  let service: MosdadCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MosdadCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
