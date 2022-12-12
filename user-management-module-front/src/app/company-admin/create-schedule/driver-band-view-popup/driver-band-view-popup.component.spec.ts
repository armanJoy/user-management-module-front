import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverBandViewPopupComponent } from './driver-band-view-popup.component';

describe('DriverBandViewPopupComponent', () => {
  let component: DriverBandViewPopupComponent;
  let fixture: ComponentFixture<DriverBandViewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverBandViewPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverBandViewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
