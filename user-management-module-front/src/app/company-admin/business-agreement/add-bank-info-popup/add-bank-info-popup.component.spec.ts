import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBankInfoPopupComponent } from './add-bank-info-popup.component';

describe('AddBankInfoPopupComponent', () => {
  let component: AddBankInfoPopupComponent;
  let fixture: ComponentFixture<AddBankInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBankInfoPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBankInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
