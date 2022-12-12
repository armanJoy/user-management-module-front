import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDxrAdminAccessComponent } from './set-dxr-admin-access.component';

describe('SetDxrAdminAccessComponent', () => {
  let component: SetDxrAdminAccessComponent;
  let fixture: ComponentFixture<SetDxrAdminAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetDxrAdminAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDxrAdminAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
