import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCompanyAdminAccessComponent } from './set-company-admin-access.component';

describe('SetCompanyAdminAccessComponent', () => {
  let component: SetCompanyAdminAccessComponent;
  let fixture: ComponentFixture<SetCompanyAdminAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetCompanyAdminAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCompanyAdminAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
