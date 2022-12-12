import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAgreementPopupComponent } from './select-agreement-popup.component';

describe('SelectAgreementPopupComponent', () => {
  let component: SelectAgreementPopupComponent;
  let fixture: ComponentFixture<SelectAgreementPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAgreementPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAgreementPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
