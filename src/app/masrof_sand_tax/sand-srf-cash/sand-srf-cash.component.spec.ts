import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandSrfCashComponent } from './sand-srf-cash.component';

describe('SandSrfCashComponent', () => {
  let component: SandSrfCashComponent;
  let fixture: ComponentFixture<SandSrfCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandSrfCashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandSrfCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
