import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RegistrationStatus, RegistrationSummary, SportType } from './sports.model';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  private readonly volleyballer: RegistrationSummary[] = [{
    id: 1,
    status: RegistrationStatus.REGISTERED,
    sportInfo: {
      type: SportType.VOLLEY_243,
      dates: [
        { startTime: new Date('2024-05-18T09:00:00'), endTime: new Date('2024-05-18T18:00:00') },
        { startTime: new Date('2024-05-19T09:00:00'), endTime: new Date('2024-05-19T17:00:00') },
      ],
      organizers: ['CONTREPIED Paris'],
      contacts: ['tip@contrepied.com']
    },
    level: 'B',
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
    id: 2,
    status: RegistrationStatus.REGISTERED,
    sportInfo: {
      type: SportType.BEACH_VOLLEY_243,
      dates: [
        { startTime: new Date('2024-05-17T09:00:00'), endTime: new Date('2024-05-17T18:00:00') },
      ],
      organizers: ['CONTREPIED Paris'],
      contacts: ['tip@contrepied.com']
    },
    level: 'AB+',
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
    id: 3,
    status: RegistrationStatus.PENDING_APPROVAL,
    sportInfo: {
      type: SportType.ESPORTS,
      dates: [
        { startTime: new Date('2024-05-19T09:00:00'), endTime: new Date('2024-05-19T18:00:00') },
      ],
      organizers: ['Next Gaymer Paris'],
      contacts: ['next@gaymer.com']
    },
    level: 'Advanced',
    events: ['League of Legends', 'Overwatch', 'Valorant']
  },
  {
    id: 4,
    status: RegistrationStatus.CANCELLED,
    sportInfo: {
      type: SportType.ESPORTS,
      dates: [
        { startTime: new Date('2024-05-19T09:00:00'), endTime: new Date('2024-05-19T18:00:00') },
      ],
      organizers: ['Next Gaymer Paris'],
      contacts: ['next@gaymer.com']
    },
    level: 'Intermediate',
    events: ['Mario Kart', 'Super Smash Bros', 'FIFA']
  },
  {
    id: 5,
    status: RegistrationStatus.REFUSED,
    sportInfo: {
      type: SportType.ESPORTS,
      dates: [
        { startTime: new Date('2024-05-19T09:00:00'), endTime: new Date('2024-05-19T18:00:00') },
      ],
      organizers: ['Next Gaymer Paris'],
      contacts: ['next@gaymer.com']
    },
    level: 'Beginner',
    events: ['Tetris']
  }
    ,
  {
    id: 5,
    status: RegistrationStatus.AWAITING_PAYMENT,
    sportInfo: {
      type: SportType.BADMINTON,
      dates: [
        { startTime: new Date('2024-05-19T09:00:00'), endTime: new Date('2024-05-19T18:00:00') },
      ],
      organizers: ['Next Gaymer Paris'],
      contacts: ['next@gaymer.com']
    },
    level: 'Beginner',
    events: ['Single solo']
  }
  ];

  constructor() { }

  getSports(): Observable<RegistrationSummary[]> {
    return of(this.volleyballer);
  }

}
