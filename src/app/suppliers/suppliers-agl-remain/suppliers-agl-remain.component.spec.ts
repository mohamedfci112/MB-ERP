import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersAglRemainComponent } from './suppliers-agl-remain.component';

describe('SuppliersAglRemainComponent', () => {
  let component: SuppliersAglRemainComponent;
  let fixture: ComponentFixture<SuppliersAglRemainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliersAglRemainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersAglRemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
