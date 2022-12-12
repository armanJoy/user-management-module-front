import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTripScheduleComponent } from './vehicle-trip-schedule.component';

describe('VehicleTripScheduleComponent', () => {
  let component: VehicleTripScheduleComponent;
  let fixture: ComponentFixture<VehicleTripScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleTripScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTripScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
