import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SahbTreasuryComponent } from './sahb-treasury.component';

describe('SahbTreasuryComponent', () => {
  let component: SahbTreasuryComponent;
  let fixture: ComponentFixture<SahbTreasuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SahbTreasuryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SahbTreasuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
