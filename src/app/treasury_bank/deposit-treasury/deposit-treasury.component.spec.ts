import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositTreasuryComponent } from './deposit-treasury.component';

describe('DepositTreasuryComponent', () => {
  let component: DepositTreasuryComponent;
  let fixture: ComponentFixture<DepositTreasuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositTreasuryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositTreasuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
