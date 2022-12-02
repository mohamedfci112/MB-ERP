import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WahdatElasnafComponent } from './wahdat-elasnaf.component';

describe('WahdatElasnafComponent', () => {
  let component: WahdatElasnafComponent;
  let fixture: ComponentFixture<WahdatElasnafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WahdatElasnafComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WahdatElasnafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
