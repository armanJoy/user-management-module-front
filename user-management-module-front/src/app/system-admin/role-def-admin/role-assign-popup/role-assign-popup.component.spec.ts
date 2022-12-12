import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAssignPopupComponent } from './role-assign-popup.component';

describe('RoleAssignPopupComponent', () => {
  let component: RoleAssignPopupComponent;
  let fixture: ComponentFixture<RoleAssignPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleAssignPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAssignPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
