import { TestBed } from '@angular/core/testing';

import { BusinessAgreementService } from './business-agreement.service';

describe('BusinessAgreementService', () => {
  let service: BusinessAgreementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessAgreementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
