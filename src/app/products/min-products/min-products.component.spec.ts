import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinProductsComponent } from './min-products.component';

describe('MinProductsComponent', () => {
  let component: MinProductsComponent;
  let fixture: ComponentFixture<MinProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
