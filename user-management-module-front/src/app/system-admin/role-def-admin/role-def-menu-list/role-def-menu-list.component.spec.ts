import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDefMenuListComponent } from './role-def-menu-list.component';

describe('RoleDefMenuListComponent', () => {
  let component: RoleDefMenuListComponent;
  let fixture: ComponentFixture<RoleDefMenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleDefMenuListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleDefMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
