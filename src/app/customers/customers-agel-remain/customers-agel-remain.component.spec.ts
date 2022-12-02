import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersAgelRemainComponent } from './customers-agel-remain.component';

describe('CustomersAgelRemainComponent', () => {
  let component: CustomersAgelRemainComponent;
  let fixture: ComponentFixture<CustomersAgelRemainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersAgelRemainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersAgelRemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
