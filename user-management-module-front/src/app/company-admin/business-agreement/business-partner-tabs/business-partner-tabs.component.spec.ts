import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPartnerTabsComponent } from './business-partner-tabs.component';

describe('BusinessPartnerTabsComponent', () => {
  let component: BusinessPartnerTabsComponent;
  let fixture: ComponentFixture<BusinessPartnerTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessPartnerTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnerTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
