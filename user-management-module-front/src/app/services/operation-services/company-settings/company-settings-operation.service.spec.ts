import { TestBed } from '@angular/core/testing';

import { CompanySettingsOperationService } from './company-settings-operation.service';

describe('CompanySettingsOperationService', () => {
  let service: CompanySettingsOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanySettingsOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
