import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardInventoryComponent } from './gard-inventory.component';

describe('GardInventoryComponent', () => {
  let component: GardInventoryComponent;
  let fixture: ComponentFixture<GardInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GardInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
