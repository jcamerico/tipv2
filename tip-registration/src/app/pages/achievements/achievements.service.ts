import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Achievement } from './achievements.model';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {

  private readonly achievements = [
    {
      uid: '1',
      name: 'Danseur 2024',
      description: 'Tu as tout donné sur scène au TIP 2024! Bravo!',
      icon: '/assets/images/badges/dancer2024.webp',
    },
  ]

  constructor() { }

  getAchievements(): Observable<Achievement[]> {
    return of(this.achievements);
  }
}
