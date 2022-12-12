import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDashboardTabComponent } from './schedule-dashboard-tab.component';

describe('ScheduleDashboardTabComponent', () => {
  let component: ScheduleDashboardTabComponent;
  let fixture: ComponentFixture<ScheduleDashboardTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleDashboardTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleDashboardTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
