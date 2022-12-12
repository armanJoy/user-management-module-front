import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDefAdminComponent } from './role-def-admin.component';

describe('RoleDefAdminComponent', () => {
  let component: RoleDefAdminComponent;
  let fixture: ComponentFixture<RoleDefAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleDefAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleDefAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
