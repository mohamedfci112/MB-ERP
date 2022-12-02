import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEditQuantityComponent } from './inventory-edit-quantity.component';

describe('InventoryEditQuantityComponent', () => {
  let component: InventoryEditQuantityComponent;
  let fixture: ComponentFixture<InventoryEditQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryEditQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryEditQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
