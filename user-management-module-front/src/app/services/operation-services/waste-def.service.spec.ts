import { TestBed } from '@angular/core/testing';

import { WasteDefService } from './waste-def.service';

describe('WasteDefService', () => {
  let service: WasteDefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WasteDefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
