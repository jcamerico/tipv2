import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCheckoutComponent } from './ticket-checkout.component';
import { PartyService } from '../../party.service';
import { provideRouter } from '@angular/router';

describe('TicketCheckoutComponent', () => {
  let component: TicketCheckoutComponent;
  let fixture: ComponentFixture<TicketCheckoutComponent>;

  const partyService = jasmine.createSpyObj('PartyService', ['getCouponReduction', 'getBasketTickets']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketCheckoutComponent],
      providers: [
        { provide: PartyService, useValue: partyService },
        provideRouter([])
      ]
    })
      .compileComponents();
    partyService.getBasketTickets.and.returnValue({ partyTickets: [], drinkTickets: [] });
    fixture = TestBed.createComponent(TicketCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
