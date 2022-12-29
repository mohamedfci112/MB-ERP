import { TestBed } from '@angular/core/testing';

import { AgelSuppliersService } from './agel-suppliers.service';

describe('AgelSuppliersService', () => {
  let service: AgelSuppliersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgelSuppliersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
