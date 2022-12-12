import { TestBed } from '@angular/core/testing';

import { VehicleSetupOperationService } from './vehicle-setup-operation.service';

describe('VehicleSetupOperationService', () => {
  let service: VehicleSetupOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleSetupOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
