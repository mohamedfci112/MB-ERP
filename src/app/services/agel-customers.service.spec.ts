import { TestBed } from '@angular/core/testing';

import { AgelCustomersService } from './agel-customers.service';

describe('AgelCustomersService', () => {
  let service: AgelCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgelCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
