import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandSrfComponent } from './sand-srf.component';

describe('SandSrfComponent', () => {
  let component: SandSrfComponent;
  let fixture: ComponentFixture<SandSrfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandSrfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandSrfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
