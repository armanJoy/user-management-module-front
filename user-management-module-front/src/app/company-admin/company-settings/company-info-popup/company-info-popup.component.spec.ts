import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoPopupComponent } from './company-info-popup.component';

describe('CompanyInfoPopupComponent', () => {
  let component: CompanyInfoPopupComponent;
  let fixture: ComponentFixture<CompanyInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyInfoPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
