import { TestBed } from '@angular/core/testing';

import { CreateScheduleOperationService } from './create-schedule-operation.service';

describe('CreateScheduleOperationService', () => {
  let service: CreateScheduleOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateScheduleOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
