import { TestBed } from '@angular/core/testing';

import { FaqAdminOpService } from './faq-admin-op.service';

describe('FaqAdminOpService', () => {
  let service: FaqAdminOpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaqAdminOpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
