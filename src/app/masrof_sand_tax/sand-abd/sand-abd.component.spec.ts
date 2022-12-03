import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandAbdComponent } from './sand-abd.component';

describe('SandAbdComponent', () => {
  let component: SandAbdComponent;
  let fixture: ComponentFixture<SandAbdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandAbdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandAbdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
