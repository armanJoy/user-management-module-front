import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryDiscussionTabComponent } from './inquiry-discussion-tab.component';

describe('InquiryDiscussionTabComponent', () => {
  let component: InquiryDiscussionTabComponent;
  let fixture: ComponentFixture<InquiryDiscussionTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryDiscussionTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryDiscussionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
