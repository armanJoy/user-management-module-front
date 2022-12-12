import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineRoleTabComponent } from './define-role-tab.component';

describe('DefineRoleTabComponent', () => {
  let component: DefineRoleTabComponent;
  let fixture: ComponentFixture<DefineRoleTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefineRoleTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineRoleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
