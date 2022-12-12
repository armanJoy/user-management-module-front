import { TestBed } from '@angular/core/testing';

import { InitiateProjectOperationService } from './initiate-project-operation.service';

describe('InitiateProjectOperationService', () => {
  let service: InitiateProjectOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitiateProjectOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
