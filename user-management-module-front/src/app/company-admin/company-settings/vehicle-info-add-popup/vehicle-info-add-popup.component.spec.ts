import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInfoAddPopupComponent } from './vehicle-info-add-popup.component';

describe('VehicleInfoAddPopupComponent', () => {
  let component: VehicleInfoAddPopupComponent;
  let fixture: ComponentFixture<VehicleInfoAddPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleInfoAddPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInfoAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
