import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageAlertPopupComponent } from './language-alert-popup.component';

describe('LanguageAlertPopupComponent', () => {
  let component: LanguageAlertPopupComponent;
  let fixture: ComponentFixture<LanguageAlertPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageAlertPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageAlertPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
