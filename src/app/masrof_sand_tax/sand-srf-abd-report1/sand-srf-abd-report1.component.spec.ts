import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandSrfAbdReport1Component } from './sand-srf-abd-report1.component';

describe('SandSrfAbdReport1Component', () => {
  let component: SandSrfAbdReport1Component;
  let fixture: ComponentFixture<SandSrfAbdReport1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandSrfAbdReport1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SandSrfAbdReport1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
