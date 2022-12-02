import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaraktSanfComponent } from './harakt-sanf.component';

describe('HaraktSanfComponent', () => {
  let component: HaraktSanfComponent;
  let fixture: ComponentFixture<HaraktSanfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaraktSanfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaraktSanfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
