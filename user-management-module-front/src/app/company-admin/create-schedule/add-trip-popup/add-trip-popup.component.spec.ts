import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTripPopupComponent } from './add-trip-popup.component';

describe('AddTripPopupComponent', () => {
  let component: AddTripPopupComponent;
  let fixture: ComponentFixture<AddTripPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTripPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTripPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
