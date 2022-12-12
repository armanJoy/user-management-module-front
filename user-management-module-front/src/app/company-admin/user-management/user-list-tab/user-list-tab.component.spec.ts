import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListTabComponent } from './user-list-tab.component';

describe('UserListTabComponent', () => {
  let component: UserListTabComponent;
  let fixture: ComponentFixture<UserListTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
