import { TestBed } from '@angular/core/testing';

import { InquiryAdminService } from './inquiry-admin.service';

describe('InquiryAdminService', () => {
  let service: InquiryAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InquiryAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
