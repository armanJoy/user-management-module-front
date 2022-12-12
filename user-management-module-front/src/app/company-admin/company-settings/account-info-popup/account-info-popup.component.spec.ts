import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInfoPopupComponent } from './account-info-popup.component';

describe('AccountInfoPopupComponent', () => {
  let component: AccountInfoPopupComponent;
  let fixture: ComponentFixture<AccountInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountInfoPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
