import { TestBed } from '@angular/core/testing';

import { CreditCartService } from './credit-card.service';

describe('CreditCartService', () => {
  let service: CreditCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
