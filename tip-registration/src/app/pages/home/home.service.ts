import { Injectable } from '@angular/core';
import { Alert, HomeInfo } from './home.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly SERVER_URL = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getHomeContent(): Observable<HomeInfo> {
    return this.http.get<HomeInfo>(this.SERVER_URL + '/summary');
  }

  getAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.SERVER_URL + '/alerts');
  }

}
