import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCancellationModalComponent } from './user-cancellation-modal.component';
import { ComponentRef } from '@angular/core';
import { RegistrationStatus, SportType } from '../../sports.model';

describe('UserCancellationModalComponent', () => {
  let component: UserCancellationModalComponent;
  let componentRef: ComponentRef<UserCancellationModalComponent>;
  let fixture: ComponentFixture<UserCancellationModalComponent>;

  const CONFIRMED_VOLLEY_REGISTRATION = {
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCancellationModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserCancellationModalComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('sportRegistration', CONFIRMED_VOLLEY_REGISTRATION);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
