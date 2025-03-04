import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TicketCode } from './party.model';
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
}
