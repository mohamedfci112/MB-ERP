import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesArbahReportComponent } from './sales-arbah-report.component';

describe('SalesArbahReportComponent', () => {
  let component: SalesArbahReportComponent;
  let fixture: ComponentFixture<SalesArbahReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesArbahReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesArbahReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
