import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryReplyComponent } from './inquiry-reply.component';

describe('InquiryReplyComponent', () => {
  let component: InquiryReplyComponent;
  let fixture: ComponentFixture<InquiryReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
