import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryBankCreditComponent } from './treasury-bank-credit.component';

describe('TreasuryBankCreditComponent', () => {
  let component: TreasuryBankCreditComponent;
  let fixture: ComponentFixture<TreasuryBankCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreasuryBankCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasuryBankCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
