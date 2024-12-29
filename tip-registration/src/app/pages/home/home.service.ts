import { Injectable } from '@angular/core';
import { Alert, AlertType, HomeInfo } from './home.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  // TODO: Replace this with a call to a backend service
  private readonly volleyInfo = {
    sports: ['Volleyball', 'Beach Volleyball', 'E-sports'],
    partyTickets: 2
  };

  private readonly notRegistered = {
    sports: [],
    partyTickets: 0
  };

  private readonly fighter = {
    sports: ['Boxing'],
    partyTickets: 1
  };


  private readonly noAlerts = [];
  private readonly manyAlerts = [
    { type: AlertType.Info, message: 'This is an info alert' },
    { type: AlertType.Info, message: 'This is another info alert' },
    { type: AlertType.Warning, message: 'This is a warning alert' },
    { type: AlertType.Error, message: 'This is an error alert' }
  ];


  constructor() { }

  getHomeContent(): Observable<HomeInfo> {
    return of(this.volleyInfo);
  }

  getAlerts(): Observable<Alert[]> {
    return of(this.noAlerts);
  }

}
