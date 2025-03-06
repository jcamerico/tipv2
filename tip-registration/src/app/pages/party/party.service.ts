import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BasketTicket, CouponReduction, TicketCode } from './party.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  readonly SERVER_URL = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getTicketCodes(): Observable<TicketCode[]> {
    return this.http.get<TicketCode[]>(this.SERVER_URL + '/tickets');
  }

  getCouponReduction(couponCode: string): Observable<CouponReduction> {
    return this.http.get<CouponReduction>(this.SERVER_URL + '/coupons/' + couponCode);
  }

  getPartyTicketPrice(): Observable<number> {
    // FIXME: Prices should come from backend, modifiable from an admin interface
    return of(25);
  }

  getDrinkTicketPrice(): Observable<number> {
    // FIXME: Prices should come from backend, modifiable from an admin interface
    return of(5);
  }

  getBasketTickets(): { partyTickets: BasketTicket[], drinkTickets: BasketTicket[] } {
    const savedBasket = localStorage.getItem('ticketBasket');
    if (savedBasket) {
      const basket = JSON.parse(savedBasket) as { partyTickets: BasketTicket[], drinkTickets: BasketTicket[] };
      return basket;
    } else {
      return { partyTickets: [], drinkTickets: [] };
    }
  }

  saveBasketTickets(partyTickets: BasketTicket[], drinkTickets: BasketTicket[]): void {
    localStorage.setItem('ticketBasket', JSON.stringify({ partyTickets, drinkTickets }));
  }
}
