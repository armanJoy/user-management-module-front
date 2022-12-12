import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailsPopupComponent } from './trip-details-popup.component';

describe('TripDetailsPopupComponent', () => {
  let component: TripDetailsPopupComponent;
  let fixture: ComponentFixture<TripDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDetailsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
