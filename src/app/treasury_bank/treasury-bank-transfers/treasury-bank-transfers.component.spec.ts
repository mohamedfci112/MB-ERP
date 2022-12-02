import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryBankTransfersComponent } from './treasury-bank-transfers.component';

describe('TreasuryBankTransfersComponent', () => {
  let component: TreasuryBankTransfersComponent;
  let fixture: ComponentFixture<TreasuryBankTransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreasuryBankTransfersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasuryBankTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
