import { TestBed } from '@angular/core/testing';

import { CustomerApplicantService } from './customer-applicant.service';

describe('CustomerApplicantService', () => {
  let service: CustomerApplicantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerApplicantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
