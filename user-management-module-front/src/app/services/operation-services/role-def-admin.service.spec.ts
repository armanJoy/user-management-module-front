import { TestBed } from '@angular/core/testing';

import { RoleDefAdminService } from './role-def-admin.service';

describe('RoleDefAdminService', () => {
  let service: RoleDefAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleDefAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
