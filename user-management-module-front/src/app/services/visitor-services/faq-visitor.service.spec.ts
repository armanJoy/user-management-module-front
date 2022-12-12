import { TestBed } from '@angular/core/testing';

import { FaqVisitorService } from './faq-visitor.service';

describe('FaqVisitorService', () => {
  let service: FaqVisitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaqVisitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
