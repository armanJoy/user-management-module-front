import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementViewPopupComponent } from './agreement-view-popup.component';

describe('AgreementViewPopupComponent', () => {
  let component: AgreementViewPopupComponent;
  let fixture: ComponentFixture<AgreementViewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreementViewPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementViewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
