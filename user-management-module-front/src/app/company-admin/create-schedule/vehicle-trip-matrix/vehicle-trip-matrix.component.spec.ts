import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTripMatrixComponent } from './vehicle-trip-matrix.component';

describe('VehicleTripMatrixComponent', () => {
  let component: VehicleTripMatrixComponent;
  let fixture: ComponentFixture<VehicleTripMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleTripMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTripMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
