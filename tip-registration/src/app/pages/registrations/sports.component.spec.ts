import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsComponent } from './sports.component';
import { RegistrationStatus, ReimbursementStatus, ReimbursementType, SportType } from './sports.model';
import { EventEmitter, signal } from '@angular/core';
import { SportsService } from './sports.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

describe('SportsComponent', () => {
  let component: SportsComponent;
  let fixture: ComponentFixture<SportsComponent>;

  const modalService = jasmine.createSpyObj('NgbModal', ['open']);
  const modalReference = jasmine.createSpyObj('NgbModalRef', ['close', 'dismiss'], ['componentInstance']);
  const sportsService = jasmine.createSpyObj('SportsService', ['getSports', 'getSportReimbursements', 'cancelRegistration', 'createReimbursementRequest']);

  const sports = [
    {
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
      }
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsComponent],
      providers: [
        { provide: SportsService, useValue: sportsService },
        { provide: NgbModal, useValue: modalService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SportsComponent);
    component = fixture.componentInstance;
    modalService.open.and.returnValue(modalReference);
    sportsService.getSports.and.returnValue(of(sports));
    sportsService.getSportReimbursements.and.returnValue(of([]));
    fixture.detectChanges();
  });

  afterEach(() => {
    modalService.open.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a sport', () => {
    component.addSport();
    // Add logic
  });

  it('should trigger payment', () => {
    component.triggerPayment(sports[0].uid);
    // Add logic
  });

  it('should modify registration', () => {
    component.modifyRegistration(sports[0].uid);
    // Add logic
  });

  it('should not open modal if uid does not match', () => {
    component.cancelRegistration('invalid-uid');
    expect(modalService.open).not.toHaveBeenCalled();
  });

  it('should dismiss cancel registration modal', () => {
    const modalComponent = {
      sportRegistration: signal({}),
      dismissed: new EventEmitter<void>(),
      confirmed: new EventEmitter<void>(),
    };
    spyPropertyGetter(modalReference, 'componentInstance').and.returnValue(modalComponent);

    component.cancelRegistration(sports[0].uid);
    modalComponent.dismissed.emit();

    expect(modalReference.dismiss).toHaveBeenCalled();
    expect(modalComponent.sportRegistration()).toEqual(sports[0]);
  });

  it('should cancel registration', () => {
    const modalComponent = {
      sportRegistration: signal({}),
      dismissed: new EventEmitter<void>(),
      confirmed: new EventEmitter<void>(),
    };
    spyPropertyGetter(modalReference, 'componentInstance').and.returnValue(modalComponent);
    sportsService.cancelRegistration.and.returnValue(of(null));

    component.cancelRegistration(sports[0].uid);
    modalComponent.confirmed.emit();

    expect(modalReference.close).toHaveBeenCalled();
    expect(modalComponent.sportRegistration()).toEqual(sports[0]);
    expect(component.sports()[0].status).toEqual(RegistrationStatus.CANCELLED_BY_USER);
  });

  it('should not open reimbursement modal if registration uid does not exist', () => {
    component.triggerUnregistration('invalid-uid');
    expect(modalService.open).not.toHaveBeenCalled();
  });

  it('should dismiss reimbursement modal', () => {
    const modalComponent = {
      sportRegistration: signal({}),
      dismissed: new EventEmitter<void>(),
      confirmed: new EventEmitter<void>(),
    };
    spyPropertyGetter(modalReference, 'componentInstance').and.returnValue(modalComponent);

    component.triggerUnregistration(sports[0].uid);
    modalComponent.dismissed.emit();

    expect(modalReference.dismiss).toHaveBeenCalled();
    expect(modalComponent.sportRegistration()).toEqual(sports[0]);
  });

  it('should create reimbursement', () => {
    const modalComponent = {
      sportRegistration: signal({}),
      dismissed: new EventEmitter<void>(),
      confirmed: new EventEmitter<void>(),
    };
    spyPropertyGetter(modalReference, 'componentInstance').and.returnValue(modalComponent);
    const reimbursement = {
      uid: '3c4d5e6f-7e8f-4d9e-9f1e-8b9e0b8f1e8b',
      sportUid: sports[0].uid,
      sport: SportType.BEACH_VOLLEY_243,
      type: ReimbursementType.TOTAL,
      status: ReimbursementStatus.AWAITING_REIMBURSEMENT,
      creationDate: new Date('2024-05-19T09:00:00'),
      lastUpdateDate: new Date('2024-05-21T09:00:00'),
      reason: 'Injury'
    };
    sportsService.createReimbursementRequest.and.returnValue(of(reimbursement));

    component.triggerUnregistration(sports[0].uid);
    modalComponent.confirmed.emit();

    expect(modalReference.close).toHaveBeenCalled();
    expect(modalComponent.sportRegistration()).toEqual(sports[0]);
    expect(component.sports()[0].unregistration).toBeTrue();
    expect(component.reimbursements()).toEqual([reimbursement]);
  });

});


function spyPropertyGetter<T, K extends keyof T>(
  spyObj: jasmine.SpyObj<T>,
  propName: K
): jasmine.Spy<() => T[K]> {
  return Object.getOwnPropertyDescriptor(spyObj, propName)?.get as jasmine.Spy<() => T[K]>;
}

