import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryDepositReportComponent } from './treasury-deposit-report.component';

describe('TreasuryDepositReportComponent', () => {
  let component: TreasuryDepositReportComponent;
  let fixture: ComponentFixture<TreasuryDepositReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreasuryDepositReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasuryDepositReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
