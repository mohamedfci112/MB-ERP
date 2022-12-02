import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDepositReportComponent } from './bank-deposit-report.component';

describe('BankDepositReportComponent', () => {
  let component: BankDepositReportComponent;
  let fixture: ComponentFixture<BankDepositReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankDepositReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankDepositReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
