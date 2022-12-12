import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBankPopupComponent } from './select-bank-popup.component';

describe('SelectBankPopupComponent', () => {
  let component: SelectBankPopupComponent;
  let fixture: ComponentFixture<SelectBankPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBankPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBankPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
