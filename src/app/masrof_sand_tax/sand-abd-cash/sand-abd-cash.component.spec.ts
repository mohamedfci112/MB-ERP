import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandAbdCashComponent } from './sand-abd-cash.component';

describe('SandAbdCashComponent', () => {
  let component: SandAbdCashComponent;
  let fixture: ComponentFixture<SandAbdCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandAbdCashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandAbdCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
