import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegister } from './user.register.component';

describe('CreateDxrAdminComponent', () => {
  let component: UserRegister;
  let fixture: ComponentFixture<UserRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegister ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

