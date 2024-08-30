import { TestBed } from '@angular/core/testing';

import { CalendlyServiceService } from '../calendly.service';

describe('CalendlyServiceService', () => {
  let service: CalendlyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendlyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
