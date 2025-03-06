import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBuyComponent } from './ticket-buy.component';
import { provideRouter, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartyService } from '../../party.service';
import { of } from 'rxjs';

describe('TicketBuyComponent', () => {
  let component: TicketBuyComponent;
  let fixture: ComponentFixture<TicketBuyComponent>;

  const partyService = jasmine.createSpyObj('PartyService', ['getPartyTicketPrice', 'getDrinkTicketPrice', 'getBasketTickets', 'saveBasketTickets']);
  const modalService = jasmine.createSpyObj('NgbModal', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketBuyComponent],
      providers: [
        { provide: PartyService, useValue: partyService },
        { provide: NgbModal, useValue: modalService },
        provideRouter([])
      ]
    })
      .compileComponents();

    partyService.getBasketTickets.and.returnValue({ partyTickets: [], drinkTickets: [] });
    partyService.getPartyTicketPrice.and.returnValue(of(10));
    partyService.getDrinkTicketPrice.and.returnValue(of(1));
    fixture = TestBed.createComponent(TicketBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
