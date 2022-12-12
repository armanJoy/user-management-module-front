import { TestBed } from '@angular/core/testing';

import { WasteRequestService } from './waste-request.service';

describe('WasteRequestService', () => {
  let service: WasteRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WasteRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
