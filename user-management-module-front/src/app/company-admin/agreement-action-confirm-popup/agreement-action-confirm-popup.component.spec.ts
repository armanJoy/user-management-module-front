import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementActionConfirmPopupComponent } from './agreement-action-confirm-popup.component';

describe('AgreementActionConfirmPopupComponent', () => {
  let component: AgreementActionConfirmPopupComponent;
  let fixture: ComponentFixture<AgreementActionConfirmPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreementActionConfirmPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementActionConfirmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
