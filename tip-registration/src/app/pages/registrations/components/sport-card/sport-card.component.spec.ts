import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportCardComponent } from './sport-card.component';
import { RegistrationStatus, SportType } from '../../sports.model';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SportCardComponent', () => {
  let component: SportCardComponent;
  let componentRef: ComponentRef<SportCardComponent>;
  let fixture: ComponentFixture<SportCardComponent>;

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
      imports: [SportCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SportCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('sport', CONFIRMED_VOLLEY_REGISTRATION);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display complete team information', () => {
    componentRef.setInput('sport', CONFIRMED_VOLLEY_REGISTRATION);
    fixture.detectChanges();

    const teamCompletion = fixture.debugElement.query(By.css('.text-bg-success'));
    expect(teamCompletion.nativeElement.innerHTML).toContain('Team complete');

    const teamNameAndCode = fixture.debugElement.query(By.css('.text-bg-info'));
    expect(teamNameAndCode.nativeElement.innerHTML).toContain(`${CONFIRMED_VOLLEY_REGISTRATION.teamInfo.name} (Code: ${CONFIRMED_VOLLEY_REGISTRATION.teamInfo.code})`);

    const teamLevel = fixture.debugElement.query(By.css('.text-bg-primary'));
    expect(teamLevel.nativeElement.innerHTML).toContain(`Level: ${CONFIRMED_VOLLEY_REGISTRATION.level}`);

    const teamComposition = fixture.debugElement.query(By.css('.text-body'));
    expect(teamComposition.nativeElement.innerHTML).toContain('Team currently composed by:');
    CONFIRMED_VOLLEY_REGISTRATION.teamInfo.members.forEach(member => expect(teamComposition.nativeElement.innerHTML).toContain(`${member.lastName.toUpperCase()} ${member.firstName}`));
  });

  it('should display correct buttons for confirmed registration', () => {
    componentRef.setInput('sport', CONFIRMED_VOLLEY_REGISTRATION);
    fixture.detectChanges();

    const actionButtons = fixture.debugElement.queryAll(By.css('.btn'));
    expect(actionButtons.length).toBe(2);
    const actions = actionButtons.map(button => button.nativeElement.innerHTML);
    expect(actions.find(action => action === 'Modify')).toBeTruthy();
    expect(actions.find(action => action === 'Unregister')).toBeTruthy();
  });

  it('should emit event when user clicks on modify', (done: DoneFn) => {
    component.modification.subscribe(() => {
      done();
    });

    componentRef.setInput('sport', CONFIRMED_VOLLEY_REGISTRATION);
    fixture.detectChanges();

    const modifyButton = fixture.debugElement.query(By.css('.btn.btn-light'));
    modifyButton.triggerEventHandler('click', null);
    fixture.detectChanges();
  });

  it('should emit event when user clicks on unregister', (done: DoneFn) => {
    component.unregister.subscribe(() => {
      done();
    });

    componentRef.setInput('sport', CONFIRMED_VOLLEY_REGISTRATION);
    fixture.detectChanges();

    const modifyButton = fixture.debugElement.query(By.css('.btn.btn-danger'));
    modifyButton.triggerEventHandler('click', null);
    fixture.detectChanges();
  });

});
