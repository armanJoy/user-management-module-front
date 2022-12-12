import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerDetailsPopupComponent } from './partner-details-popup.component';

describe('PartnerDetailsPopupComponent', () => {
  let component: PartnerDetailsPopupComponent;
  let fixture: ComponentFixture<PartnerDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerDetailsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
