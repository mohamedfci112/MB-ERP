import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMasrofComponent } from './add-masrof.component';

describe('AddMasrofComponent', () => {
  let component: AddMasrofComponent;
  let fixture: ComponentFixture<AddMasrofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMasrofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMasrofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
