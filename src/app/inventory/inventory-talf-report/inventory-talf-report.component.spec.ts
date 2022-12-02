import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTalfReportComponent } from './inventory-talf-report.component';

describe('InventoryTalfReportComponent', () => {
  let component: InventoryTalfReportComponent;
  let fixture: ComponentFixture<InventoryTalfReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryTalfReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTalfReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
