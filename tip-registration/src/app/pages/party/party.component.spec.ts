import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyComponent } from './party.component';
import { PartyService } from './party.service';
import { of, Subject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { TicketCode } from './party.model';

describe('PartyComponent', () => {
  let component: PartyComponent;
  let fixture: ComponentFixture<PartyComponent>;
  const partyService = jasmine.createSpyObj('PartyService', ['getTicketCodes']);
  const ticketCodeSubject = new Subject<TicketCode[]>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyComponent],
      providers: [
        { provide: PartyService, useValue: partyService }
      ]
    })
      .compileComponents();
    partyService.getTicketCodes.and.returnValue(ticketCodeSubject.asObservable());
    fixture = TestBed.createComponent(PartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should display separately party tickets and drink tickets', () => {
    ticketCodeSubject.next([
      {
        uid: '123',
        party: true,
        owner: 'John DOE',
        drinks: 1,
      },
      {
        uid: '124',
        party: false,
        drinks: 1,
      }
    ]);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.party-ticket')).length).toBe(1);
    expect(fixture.debugElement.queryAll(By.css('.drink-ticket')).length).toBe(1);
  });

  it('should display special message when no party ticket has been purchased', () => {
    ticketCodeSubject.next([
      {
        uid: '124',
        party: false,
        drinks: 1,
      }
    ]);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.party-ticket')).length).toBe(0);
    expect(fixture.debugElement.queryAll(By.css('.drink-ticket')).length).toBe(1);

  });

  it('should display special message when no drink ticket has been purchased', () => {
    ticketCodeSubject.next([
      {
        uid: '123',
        party: true,
        owner: 'John DOE',
        drinks: 1,
      }
    ]);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.party-ticket')).length).toBe(1);
    expect(fixture.debugElement.queryAll(By.css('.drink-ticket')).length).toBe(0);

  });
});
