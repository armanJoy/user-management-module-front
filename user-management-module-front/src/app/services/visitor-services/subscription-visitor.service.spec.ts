import { TestBed } from '@angular/core/testing';

import { SubscriptionVisitorService } from './subscription-visitor.service';

describe('SubscriptionVisitorService', () => {
  let service: SubscriptionVisitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionVisitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
