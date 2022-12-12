import { TestBed } from '@angular/core/testing';

import { LoadUnloadService } from './load-unload.service';

describe('LoadUnloadService', () => {
  let service: LoadUnloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadUnloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
