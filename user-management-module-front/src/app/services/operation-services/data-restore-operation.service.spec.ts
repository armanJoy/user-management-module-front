import { TestBed } from '@angular/core/testing';

import { DataRestoreOperationService } from './data-restore-operation.service';

describe('DataRestoreOperationService', () => {
  let service: DataRestoreOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRestoreOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
