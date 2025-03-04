import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Achievement } from './achievements.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {

  private readonly SERVER_URL = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getAchievements(): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(this.SERVER_URL + '/achievements');
  }

}
