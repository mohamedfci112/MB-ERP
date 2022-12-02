import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryTransformReportComponent } from './treasury-transform-report.component';

describe('TreasuryTransformReportComponent', () => {
  let component: TreasuryTransformReportComponent;
  let fixture: ComponentFixture<TreasuryTransformReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreasuryTransformReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasuryTransformReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
