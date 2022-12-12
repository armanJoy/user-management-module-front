import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSchedulePopupComponent } from './confirm-schedule-popup.component';

describe('ConfirmSchedulePopupComponent', () => {
  let component: ConfirmSchedulePopupComponent;
  let fixture: ComponentFixture<ConfirmSchedulePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmSchedulePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSchedulePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
