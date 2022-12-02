import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthMashobatComponent } from './month-mashobat.component';

describe('MonthMashobatComponent', () => {
  let component: MonthMashobatComponent;
  let fixture: ComponentFixture<MonthMashobatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthMashobatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthMashobatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
