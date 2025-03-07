import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationStatus, RegistrationSummary, SportReimbursementSummary } from './sports.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SportsService {
  readonly SERVER_URL = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getSports(): Observable<RegistrationSummary[]> {
    return this.http.get<RegistrationSummary[]>(this.SERVER_URL + '/registrations');
  }

  getSportReimbursements(): Observable<SportReimbursementSummary[]> {
    return this.http.get<SportReimbursementSummary[]>(this.SERVER_URL + '/reimbursements');
  }

  cancelRegistration(uid: string): Observable<void> {
    return this.http.put<void>(this.SERVER_URL + '/registrations/' + uid, {
      status: RegistrationStatus.CANCELLED_BY_USER
    });
  }

  createReimbursementRequest(reason: string, uid: string): Observable<SportReimbursementSummary> {
    return this.http.post<SportReimbursementSummary>(this.SERVER_URL + '/reimbursements', {
      sportUid: uid,
      reason: reason
    });
  }

}
