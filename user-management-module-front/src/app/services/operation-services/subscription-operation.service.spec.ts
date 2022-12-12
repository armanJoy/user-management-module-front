import { TestBed } from '@angular/core/testing';

import { SubscriptionOperationService } from './subscription-operation.service';

describe('SubscriptionOperationService', () => {
  let service: SubscriptionOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
