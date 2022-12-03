import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasrofReportComponent } from './masrof-report.component';

describe('MasrofReportComponent', () => {
  let component: MasrofReportComponent;
  let fixture: ComponentFixture<MasrofReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasrofReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasrofReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
