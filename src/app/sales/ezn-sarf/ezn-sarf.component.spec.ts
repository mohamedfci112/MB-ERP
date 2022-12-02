import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EznSarfComponent } from './ezn-sarf.component';

describe('EznSarfComponent', () => {
  let component: EznSarfComponent;
  let fixture: ComponentFixture<EznSarfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EznSarfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EznSarfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
