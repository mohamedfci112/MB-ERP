import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTransfersComponent } from './inventory-transfers.component';

describe('InventoryTransfersComponent', () => {
  let component: InventoryTransfersComponent;
  let fixture: ComponentFixture<InventoryTransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryTransfersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
