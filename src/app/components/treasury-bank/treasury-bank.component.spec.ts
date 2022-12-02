import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryBankComponent } from './treasury-bank.component';

describe('TreasuryBankComponent', () => {
  let component: TreasuryBankComponent;
  let fixture: ComponentFixture<TreasuryBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreasuryBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasuryBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
