import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountInfoPopupComponent } from './bank-account-info-popup.component';

describe('BankAccountInfoPopupComponent', () => {
  let component: BankAccountInfoPopupComponent;
  let fixture: ComponentFixture<BankAccountInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountInfoPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
