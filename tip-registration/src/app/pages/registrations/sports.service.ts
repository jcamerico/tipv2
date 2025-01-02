import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { RegistrationStatus, RegistrationSummary, ReimbursementStatus, ReimbursementType, SportReimbursementSummary, SportType } from './sports.model';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  private volleyballer: RegistrationSummary[] = [{
    uid: '3f50c0b4-8c3b-4d3e-8f1e-2b4e6b8f1e2b',
    unregistration: false,
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
    uid: '7d9f8a2e-4b3c-4d8e-9f1e-3b4e7b8f1e3b',
    unregistration: true,
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
    uid: '1a2b3c4d-5e6f-4d7e-8f1e-4b5e8b9f1e4b',
    unregistration: false,
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
    uid: '9f8e7d6c-5b4a-4d3e-8f1e-5b6e9b8f1e5b',
    unregistration: false,
    status: RegistrationStatus.CANCELLED_BY_USER,
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
    uid: '2b3c4d5e-6f7e-4d8e-9f1e-6b7e9b8f1e6b',
    unregistration: false,
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
    uid: '8f7e6d5c-4b3a-4d2e-8f1e-7b8e9b8f1e7b',
    unregistration: false,
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

  private readonly reimbursements = [
    {
      uid: '3c4d5e6f-7e8f-4d9e-9f1e-8b9e0b8f1e8b',
      sportUid: '7d9f8a2e-4b3c-4d8e-9f1e-3b4e7b8f1e3b',
      sport: SportType.BEACH_VOLLEY_243,
      type: ReimbursementType.TOTAL,
      status: ReimbursementStatus.AWAITING_REIMBURSEMENT,
      creationDate: new Date('2024-05-19T09:00:00'),
      lastUpdateDate: new Date('2024-05-21T09:00:00'),
      reason: 'Injury'
    }
  ]

  constructor() { }

  getSports(): Observable<RegistrationSummary[]> {
    return of(this.volleyballer);
  }

  getSportReimbursements(): Observable<SportReimbursementSummary[]> {
    return of(this.reimbursements);
  }

  cancelRegistration(uid: string): Observable<void> {
    const sport = this.volleyballer.find(sport => sport.uid === uid);
    if (sport) {
      sport.status = RegistrationStatus.CANCELLED_BY_USER;
    }
    return of(void 0);
  }

  createReimbursementRequest(reason: string, uid: string): Observable<SportReimbursementSummary> {
    const sport = this.volleyballer.find(sport => sport.uid === uid);
    if (sport) {
      sport.unregistration = true;
      const newReimbursementRequest = {
        sport: sport.sportInfo.type,
        sportUid: sport.uid,
        uid: sport.uid,
        creationDate: new Date(),
        lastUpdateDate: new Date(),
        type: ReimbursementType.TOTAL,
        status: ReimbursementStatus.OPEN,
        reason: reason
      };
      return of(newReimbursementRequest);
    } else {
      return throwError(() => new Error());
    }
  }

}
