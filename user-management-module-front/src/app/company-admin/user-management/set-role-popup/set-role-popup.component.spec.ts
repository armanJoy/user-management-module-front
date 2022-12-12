import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRolePopupComponent } from './set-role-popup.component';

describe('SetRolePopupComponent', () => {
  let component: SetRolePopupComponent;
  let fixture: ComponentFixture<SetRolePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetRolePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRolePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
