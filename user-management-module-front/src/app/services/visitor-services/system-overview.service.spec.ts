import { TestBed } from '@angular/core/testing';

import { SystemOverviewService } from './system-overview.service';

describe('SystemOverviewService', () => {
  let service: SystemOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
