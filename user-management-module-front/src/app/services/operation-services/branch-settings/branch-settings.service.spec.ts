import { TestBed } from '@angular/core/testing';

import { BranchSettingsService } from './branch-settings.service';

describe('BranchSettingsService', () => {
  let service: BranchSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
