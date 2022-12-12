import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Co2DetailPopupComponent } from './co2-detail-popup.component';

describe('Co2DetailPopupComponent', () => {
  let component: Co2DetailPopupComponent;
  let fixture: ComponentFixture<Co2DetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Co2DetailPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Co2DetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
