import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTalfComponent } from './inventory-talf.component';

describe('InventoryTalfComponent', () => {
  let component: InventoryTalfComponent;
  let fixture: ComponentFixture<InventoryTalfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryTalfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTalfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
