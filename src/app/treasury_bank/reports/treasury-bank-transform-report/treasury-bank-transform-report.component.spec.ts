import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryBankTransformReportComponent } from './treasury-bank-transform-report.component';

describe('TreasuryBankTransformReportComponent', () => {
  let component: TreasuryBankTransformReportComponent;
  let fixture: ComponentFixture<TreasuryBankTransformReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreasuryBankTransformReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasuryBankTransformReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
