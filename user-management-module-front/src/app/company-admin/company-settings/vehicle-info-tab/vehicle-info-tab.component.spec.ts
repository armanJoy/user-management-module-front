import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInfoTabComponent } from './vehicle-info-tab.component';

describe('VehicleInfoTabComponent', () => {
  let component: VehicleInfoTabComponent;
  let fixture: ComponentFixture<VehicleInfoTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleInfoTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
