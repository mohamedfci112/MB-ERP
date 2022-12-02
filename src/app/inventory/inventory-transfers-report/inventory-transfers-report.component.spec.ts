import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTransfersReportComponent } from './inventory-transfers-report.component';

describe('InventoryTransfersReportComponent', () => {
  let component: InventoryTransfersReportComponent;
  let fixture: ComponentFixture<InventoryTransfersReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryTransfersReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTransfersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
