import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSolfaComponent } from './add-solfa.component';

describe('AddSolfaComponent', () => {
  let component: AddSolfaComponent;
  let fixture: ComponentFixture<AddSolfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSolfaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSolfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
