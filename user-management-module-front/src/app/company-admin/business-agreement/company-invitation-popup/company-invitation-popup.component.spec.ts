import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInvitationPopupComponent } from './company-invitation-popup.component';

describe('CompanyInvitationPopupComponent', () => {
  let component: CompanyInvitationPopupComponent;
  let fixture: ComponentFixture<CompanyInvitationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyInvitationPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInvitationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
