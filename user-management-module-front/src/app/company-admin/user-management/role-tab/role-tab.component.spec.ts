import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleTabComponent } from './role-tab.component';

describe('RoleTabComponent', () => {
  let component: RoleTabComponent;
  let fixture: ComponentFixture<RoleTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
