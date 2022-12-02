import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEditCostComponent } from './inventory-edit-cost.component';

describe('InventoryEditCostComponent', () => {
  let component: InventoryEditCostComponent;
  let fixture: ComponentFixture<InventoryEditCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryEditCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryEditCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
