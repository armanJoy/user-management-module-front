import { TestBed } from '@angular/core/testing';

import { InquiryVisitorService } from './inquiry-visitor.service';

describe('InquiryVisitorService', () => {
  let service: InquiryVisitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InquiryVisitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
