import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyComponent } from './party.component';
import { PartyService } from './party.service';
import { of, Subject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { TicketCode } from './party.model';
import { provideRouter } from '@angular/router';

describe('PartyComponent', () => {
  let component: PartyComponent;
  let fixture: ComponentFixture<PartyComponent>;
  const partyService = jasmine.createSpyObj('PartyService', ['getTicketCodes']);
  const ticketCodeSubject = new Subject<TicketCode[]>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyComponent],
      providers: [
        { provide: PartyService, useValue: partyService },
        provideRouter([])
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
      new TicketCode(3, '1234', false, 'John DOE'),
      new TicketCode(1, '1234')
    ]);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.party-ticket')).length).toBe(1);
    expect(fixture.debugElement.queryAll(By.css('.drink-ticket')).length).toBe(1);
  });

  it('should display special message when no party ticket has been purchased', () => {
    ticketCodeSubject.next([new TicketCode(1, '1234')]);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.party-ticket')).length).toBe(0);
    expect(fixture.debugElement.queryAll(By.css('.drink-ticket')).length).toBe(1);

  });

  it('should display special message when no drink ticket has been purchased', () => {
    ticketCodeSubject.next([new TicketCode(3, '1234', false, 'John DOE')]);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.party-ticket')).length).toBe(1);
    expect(fixture.debugElement.queryAll(By.css('.drink-ticket')).length).toBe(0);

  });
});
