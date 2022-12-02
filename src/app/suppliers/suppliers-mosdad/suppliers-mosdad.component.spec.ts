import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersMosdadComponent } from './suppliers-mosdad.component';

describe('SuppliersMosdadComponent', () => {
  let component: SuppliersMosdadComponent;
  let fixture: ComponentFixture<SuppliersMosdadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliersMosdadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersMosdadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
