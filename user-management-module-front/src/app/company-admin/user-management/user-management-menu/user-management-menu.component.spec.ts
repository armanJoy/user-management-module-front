import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementMenuComponent } from './user-management-menu.component';

describe('UserManagementMenuComponent', () => {
  let component: UserManagementMenuComponent;
  let fixture: ComponentFixture<UserManagementMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
