import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsElasnafComponent } from './groups-elasnaf.component';

describe('GroupsElasnafComponent', () => {
  let component: GroupsElasnafComponent;
  let fixture: ComponentFixture<GroupsElasnafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsElasnafComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsElasnafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
