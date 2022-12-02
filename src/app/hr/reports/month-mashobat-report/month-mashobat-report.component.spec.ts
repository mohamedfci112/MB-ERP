import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthMashobatReportComponent } from './month-mashobat-report.component';

describe('MonthMashobatReportComponent', () => {
  let component: MonthMashobatReportComponent;
  let fixture: ComponentFixture<MonthMashobatReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthMashobatReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthMashobatReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
