import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSetupPopupComponent } from './language-setup-popup.component';

describe('LanguageSetupPopupComponent', () => {
  let component: LanguageSetupPopupComponent;
  let fixture: ComponentFixture<LanguageSetupPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageSetupPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSetupPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
