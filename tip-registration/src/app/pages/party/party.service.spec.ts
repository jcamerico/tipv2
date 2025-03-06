import { TestBed } from '@angular/core/testing';

import { PartyService } from './party.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CouponReduction, TicketCode } from './party.model';

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

    const expectedTicketCodes = [new TicketCode(3, '1234', false, 'John DOE')];
    service.getTicketCodes().subscribe((ticketCodes) => {
      expect(ticketCodes).toEqual(expectedTicketCodes);
      done();
    });

    const req = httpTesting.expectOne(service.SERVER_URL + '/tickets', 'Request to read tickets');
    expect(req.request.method).toBe('GET');
    req.flush(expectedTicketCodes);
  });

  it('should call endpoint to read coupons', (done) => {
    const httpTesting = TestBed.inject(HttpTestingController);

    const expectedCoupon = { couponCode: '1234', description: 'Test coupon', reduction: 10 };
    service.getCouponReduction('1234').subscribe((reduction) => {
      expect(reduction).toEqual(expectedCoupon);
      done();
    });

    const req = httpTesting.expectOne(service.SERVER_URL + '/coupons/1234', 'Request to read coupon');
    expect(req.request.method).toBe('GET');
    req.flush(expectedCoupon);
  });

  it('should return party ticket price', (done) => {
    service.getPartyTicketPrice().subscribe((price) => {
      expect(price).toBe(25);
      done();
    });
  });

  it('should return drink ticket price', (done) => {
    service.getDrinkTicketPrice().subscribe((price) => {
      expect(price).toBe(5);
      done();
    });
  });

});
