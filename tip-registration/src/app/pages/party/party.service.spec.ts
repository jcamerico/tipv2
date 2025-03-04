import { TestBed } from '@angular/core/testing';

import { PartyService } from './party.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

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

  it('should call endpoint to read ticket codes', (done) => {
    const httpTesting = TestBed.inject(HttpTestingController);

    const expectedTicketCodes = [
      {
        uid: '1234',
        party: true,
        owner: 'John DOE',
        drinks: 3
      }
    ];

    service.getTicketCodes().subscribe((ticketCodes) => {
      expect(ticketCodes).toEqual(expectedTicketCodes);
      done();
    });

    const req = httpTesting.expectOne(service.SERVER_URL + '/tickets', 'Request to read tickets');
    expect(req.request.method).toBe('GET');
    req.flush(expectedTicketCodes);
  });

});
