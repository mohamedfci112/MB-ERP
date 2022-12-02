import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankSahbReportComponent } from './bank-sahb-report.component';

describe('BankSahbReportComponent', () => {
  let component: BankSahbReportComponent;
  let fixture: ComponentFixture<BankSahbReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankSahbReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankSahbReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
