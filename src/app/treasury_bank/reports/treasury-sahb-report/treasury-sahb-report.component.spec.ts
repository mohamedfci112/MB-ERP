import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasurySahbReportComponent } from './treasury-sahb-report.component';

describe('TreasurySahbReportComponent', () => {
  let component: TreasurySahbReportComponent;
  let fixture: ComponentFixture<TreasurySahbReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreasurySahbReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasurySahbReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
