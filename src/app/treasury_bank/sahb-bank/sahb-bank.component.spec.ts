import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SahbBankComponent } from './sahb-bank.component';

describe('SahbBankComponent', () => {
  let component: SahbBankComponent;
  let fixture: ComponentFixture<SahbBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SahbBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SahbBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
