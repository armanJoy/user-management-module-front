import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryVisitorTabsComponent } from './inquiry-visitor-tabs.component';

describe('InquiryVisitorTabsComponent', () => {
  let component: InquiryVisitorTabsComponent;
  let fixture: ComponentFixture<InquiryVisitorTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryVisitorTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryVisitorTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
