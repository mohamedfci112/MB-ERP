import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMasrofComponent } from './manage-masrof.component';

describe('ManageMasrofComponent', () => {
  let component: ManageMasrofComponent;
  let fixture: ComponentFixture<ManageMasrofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMasrofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMasrofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
