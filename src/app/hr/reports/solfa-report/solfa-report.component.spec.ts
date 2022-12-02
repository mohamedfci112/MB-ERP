import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolfaReportComponent } from './solfa-report.component';

describe('SolfaReportComponent', () => {
  let component: SolfaReportComponent;
  let fixture: ComponentFixture<SolfaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolfaReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolfaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
