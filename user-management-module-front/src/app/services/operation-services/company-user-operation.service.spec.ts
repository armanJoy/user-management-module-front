import { TestBed } from '@angular/core/testing';

import { CompanyUserOperationService } from './company-user-operation.service';

describe('CompanyUserOperationService', () => {
    let service: CompanyUserOperationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CompanyUserOperationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
