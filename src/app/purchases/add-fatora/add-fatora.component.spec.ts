import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFatoraComponent } from './add-fatora.component';

describe('AddFatoraComponent', () => {
  let component: AddFatoraComponent;
  let fixture: ComponentFixture<AddFatoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFatoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFatoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
