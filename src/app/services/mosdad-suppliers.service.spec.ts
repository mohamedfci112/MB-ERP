import { TestBed } from '@angular/core/testing';

import { MosdadSuppliersService } from './mosdad-suppliers.service';

describe('MosdadSuppliersService', () => {
  let service: MosdadSuppliersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MosdadSuppliersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
