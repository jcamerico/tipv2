import { TestBed } from '@angular/core/testing';

import { PartyService } from './party.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BasketTicket, CouponReduction, TicketCode } from './party.model';

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

  it('should read basket tickets', () => {
    const partyTicket = new TicketCode(0, '123', false, 'John DOE');
    const drinkTicket = new TicketCode(5);
    const expectedBasket = {
      partyTickets: [new BasketTicket(partyTicket, 25, 5)],
      drinkTickets: [new BasketTicket(drinkTicket, 25, 5)]
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ partyTickets: [partyTicket], drinkTickets: [drinkTicket] }));

    const basket = service.getBasketTickets();
    expect(JSON.stringify(basket)).toEqual(JSON.stringify(expectedBasket));
  });

  it('should return empty list of tickets when nothing is cached', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const basket = service.getBasketTickets();
    expect(JSON.stringify(basket)).toEqual(JSON.stringify({ partyTickets: [], drinkTickets: [] }));
  });

  it('should save basket tickets', () => {
    const spy = spyOn(localStorage, 'setItem');
    const partyTicket = new TicketCode(0, '123', false, 'John DOE');
    const drinkTicket = new TicketCode(5);
    const expectedBasket = { partyTickets: [partyTicket], drinkTickets: [drinkTicket] };


    service.saveBasketTickets([new BasketTicket(partyTicket, 25, 5)], [new BasketTicket(drinkTicket, 25, 5)]);
    expect(spy).toHaveBeenCalledWith('ticketBasket', JSON.stringify(expectedBasket));
  });

});
