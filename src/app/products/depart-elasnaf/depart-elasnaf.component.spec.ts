import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartElasnafComponent } from './depart-elasnaf.component';

describe('DepartElasnafComponent', () => {
  let component: DepartElasnafComponent;
  let fixture: ComponentFixture<DepartElasnafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartElasnafComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartElasnafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
