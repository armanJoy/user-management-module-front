import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTripScheduleComponent } from './project-trip-schedule.component';

describe('ProjectTripScheduleComponent', () => {
  let component: ProjectTripScheduleComponent;
  let fixture: ComponentFixture<ProjectTripScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTripScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTripScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
