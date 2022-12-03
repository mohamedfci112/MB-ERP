import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasrofSandTaxComponent } from './masrof-sand-tax.component';

describe('MasrofSandTaxComponent', () => {
  let component: MasrofSandTaxComponent;
  let fixture: ComponentFixture<MasrofSandTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasrofSandTaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasrofSandTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
