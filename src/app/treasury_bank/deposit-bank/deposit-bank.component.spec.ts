import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositBankComponent } from './deposit-bank.component';

describe('DepositBankComponent', () => {
  let component: DepositBankComponent;
  let fixture: ComponentFixture<DepositBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
