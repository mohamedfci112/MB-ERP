import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryTransfersComponent } from './treasury-transfers.component';

describe('TreasuryTransfersComponent', () => {
  let component: TreasuryTransfersComponent;
  let fixture: ComponentFixture<TreasuryTransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreasuryTransfersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasuryTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
