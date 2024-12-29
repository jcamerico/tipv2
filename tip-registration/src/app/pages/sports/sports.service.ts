import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SportSummary, SportType } from './sports.model';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  private readonly volleyballer: SportSummary[] = [{
    sportInfo: {
      type: SportType.VOLLEY_243,
      dates: [
        { startTime: new Date('2024-05-18T09:00:00'), endTime: new Date('2024-05-18T18:00:00') },
        { startTime: new Date('2024-05-19T09:00:00'), endTime: new Date('2024-05-19T17:00:00') },
      ],
      organizers: ['CONTREPIED Paris'],
      contacts: ['tip@contrepied.com']
    },
    level: 'Level B',
    teamInfo: {
      complete: true,
      name: "Victory's Secrets",
      code: 'boomi',
      members: [
        { firstName: 'Alice', lastName: 'Doe', teamCaptain: false },
        { firstName: 'Bob', lastName: 'Doe', teamCaptain: false },
        { firstName: 'Charlie', lastName: 'Doe', teamCaptain: false },
        { firstName: 'Daisy', lastName: 'Doe', teamCaptain: true },
        { firstName: 'Eve', lastName: 'Doe', teamCaptain: false },
        { firstName: 'Farid', lastName: 'Doe', teamCaptain: false },
      ]
    }
  },
  {
    sportInfo: {
      type: SportType.BEACH_VOLLEY_243,
      dates: [
        { startTime: new Date('2024-05-17T09:00:00'), endTime: new Date('2024-05-17T18:00:00') },
      ],
      organizers: ['CONTREPIED Paris'],
      contacts: ['tip@contrepied.com']
    },
    level: 'Level AB+',
    teamInfo: {
      complete: false,
      name: "Sun Sand & Spike",
      code: 'sss',
      members: [
        { firstName: 'Daisy', lastName: 'Doe', teamCaptain: true },
      ]
    }
  },
  {
    sportInfo: {
      type: SportType.ESPORTS,
      dates: [
        { startTime: new Date('2024-05-19T09:00:00'), endTime: new Date('2024-05-19T18:00:00') },
      ],
      organizers: ['Next Gaymer Paris'],
      contacts: ['next@gaymer.com']
    },
    level: 'Level Advanced',
    events: ['League of Legends', 'Overwatch', 'Valorant']
  }
  ];

  constructor() { }

  getSports(): Observable<SportSummary[]> {
    return of(this.volleyballer);
  }

}
