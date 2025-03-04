import { TestBed } from '@angular/core/testing';

import { PartyService } from './party.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PartyService', () => {
  let service: PartyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(PartyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
