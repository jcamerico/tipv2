import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TicketCode } from './party.model';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  private readonly tickets = [
    {
      uid: '7e6d5c4b-3a2b-4d1e-8f1e-9b0e1b8f1e9b',
      code: '4d5e6f7e-8f9e-4d0e-9f1e-0b1e2b8f1e0b',
      party: {
        owner: 'Alice DOE'
      },
      drinks: 0
    },
    {
      uid: '6d5c4b3a-2b1c-4d0e-8f1e-1b2e3b8f1e1b',
      code: '2c3d7d9f-5e4b-2c3d-7d9f-5e4b2c3d7d9f',
      drinks: 10
    },
    {
      uid: '3f29b9a4-8c1e-4b8e-8c1e-4b8e3f29b9a4',
      code: '7d9f5e4b-2c3d-4a1e-9f5e-4b2c3d7d9f5e',
      party: {
        owner: 'John DOE-SILVESTER-LONG-NAME'
      },
      drinks: 5
    },
    {
      uid: '6a1b2c3d-4e5f-6a1b-2c3d-4e5f6a1b2c3d',
      code: '8e4b2c3d-7d9f-5e4b-2c3d-7d9f8e4b2c3d',
      drinks: 5
    },
  ];

  getTicketCodes(): Observable<TicketCode[]> {
    return of(this.tickets);
  }
}
