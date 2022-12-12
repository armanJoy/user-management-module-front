import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemOverviewAdminComponent } from './system-overview-admin.component';

describe('SystemOverviewAdminComponent', () => {
  let component: SystemOverviewAdminComponent;
  let fixture: ComponentFixture<SystemOverviewAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemOverviewAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemOverviewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
