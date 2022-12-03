import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandSrfAbdReportComponent } from './sand-srf-abd-report.component';

describe('SandSrfAbdReportComponent', () => {
  let component: SandSrfAbdReportComponent;
  let fixture: ComponentFixture<SandSrfAbdReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandSrfAbdReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandSrfAbdReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
