import { TestBed } from '@angular/core/testing';

import { InquiryThreadDiscussionService } from './inquiry-thread-discussion.service';

describe('InquiryThreadDiscussionService', () => {
  let service: InquiryThreadDiscussionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InquiryThreadDiscussionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
