import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersMosdadComponent } from './customers-mosdad.component';

describe('CustomersMosdadComponent', () => {
  let component: CustomersMosdadComponent;
  let fixture: ComponentFixture<CustomersMosdadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersMosdadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersMosdadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
