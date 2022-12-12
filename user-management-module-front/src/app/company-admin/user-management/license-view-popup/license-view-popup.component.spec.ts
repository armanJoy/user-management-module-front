import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseViewPopupComponent } from './license-view-popup.component';

describe('LicenseViewPopupComponent', () => {
  let component: LicenseViewPopupComponent;
  let fixture: ComponentFixture<LicenseViewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseViewPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseViewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
