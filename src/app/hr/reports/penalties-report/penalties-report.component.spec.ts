import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltiesReportComponent } from './penalties-report.component';

describe('PenaltiesReportComponent', () => {
  let component: PenaltiesReportComponent;
  let fixture: ComponentFixture<PenaltiesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenaltiesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltiesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
