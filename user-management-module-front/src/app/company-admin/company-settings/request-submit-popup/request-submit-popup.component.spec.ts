import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSubmitPopupComponent } from './request-submit-popup.component';

describe('RequestSubmitPopupComponent', () => {
  let component: RequestSubmitPopupComponent;
  let fixture: ComponentFixture<RequestSubmitPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestSubmitPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSubmitPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
