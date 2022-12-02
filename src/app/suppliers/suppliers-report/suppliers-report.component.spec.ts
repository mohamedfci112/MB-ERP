import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersReportComponent } from './suppliers-report.component';

describe('SuppliersReportComponent', () => {
  let component: SuppliersReportComponent;
  let fixture: ComponentFixture<SuppliersReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliersReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
