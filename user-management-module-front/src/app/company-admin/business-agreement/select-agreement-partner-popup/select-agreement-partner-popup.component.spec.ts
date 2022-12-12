import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAgreementPartnerPopupComponent } from './select-agreement-partner-popup.component';

describe('SelectAgreementPartnerPopupComponent', () => {
  let component: SelectAgreementPartnerPopupComponent;
  let fixture: ComponentFixture<SelectAgreementPartnerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAgreementPartnerPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAgreementPartnerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
