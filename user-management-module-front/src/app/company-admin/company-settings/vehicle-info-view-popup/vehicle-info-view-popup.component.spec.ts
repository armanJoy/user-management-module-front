import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInfoViewPopupComponent } from './vehicle-info-view-popup.component';

describe('VehicleInfoViewPopupComponent', () => {
  let component: VehicleInfoViewPopupComponent;
  let fixture: ComponentFixture<VehicleInfoViewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleInfoViewPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInfoViewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
