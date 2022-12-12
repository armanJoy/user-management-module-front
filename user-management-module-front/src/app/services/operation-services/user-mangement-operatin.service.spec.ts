import { TestBed } from '@angular/core/testing';

import { UserMangementOperatinService } from './user-mangement-operatin.service';

describe('UserMangementOperatinService', () => {
  let service: UserMangementOperatinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMangementOperatinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
