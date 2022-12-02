import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalariesReportComponent } from './salaries-report.component';

describe('SalariesReportComponent', () => {
  let component: SalariesReportComponent;
  let fixture: ComponentFixture<SalariesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalariesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalariesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
