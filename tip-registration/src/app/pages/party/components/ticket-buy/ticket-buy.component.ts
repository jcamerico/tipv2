import { Component, computed, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BasketTicket, TicketCode } from '../../party.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartyTicketDialogComponent } from '../party-ticket-dialog/party-ticket-dialog.component';
import { PartyService } from '../../party.service';

@Component({
  selector: 'app-ticket-buy',
  imports: [RouterModule],
  templateUrl: './ticket-buy.component.html'
})
export class TicketBuyComponent implements OnInit {
  drinkTickets = signal<BasketTicket[]>([]);
  partyTickets = signal<BasketTicket[]>([]);

  drinkTicketPrice = signal(0);
  partyTicketPrice = signal(0);

  totalPrice = computed(
    () => [...this.drinkTickets(), ...this.partyTickets()].reduce((sum, ticket) => sum + ticket.price, 0)
  );

  constructor(private readonly router: Router, private readonly modalService: NgbModal, private readonly partyService: PartyService) { }

  ngOnInit(): void {
    this.partyService.getPartyTicketPrice().subscribe(price => this.partyTicketPrice.set(price));
    this.partyService.getDrinkTicketPrice().subscribe(price => this.drinkTicketPrice.set(price));
    const tickets = this.partyService.getBasketTickets();
    this.partyTickets.set(tickets.partyTickets);
    this.drinkTickets.set(tickets.drinkTickets);
  }

  addPartyTicket(): void {
    this.modalService.open(PartyTicketDialogComponent, { centered: true }).result.then((ticket: TicketCode) => {
      this.partyTickets.update(tickets => [...tickets, new BasketTicket(ticket, this.partyTicketPrice(), this.drinkTicketPrice())]);
    });
  }

  addDrinkTicket(): void {
    this.drinkTickets.update(tickets => [...tickets, new BasketTicket(new TicketCode(5), this.partyTicketPrice(), this.drinkTicketPrice())]);
  }

  removePartyTicket(index: number): void {
    this.partyTickets.update(tickets => tickets.filter((_, i) => i !== index));
  }

  removeDrinkTicket(index: number): void {
    this.drinkTickets.update(tickets => tickets.filter((_, i) => i !== index));
  }

  checkout(): void {
    this.partyService.saveBasketTickets(this.partyTickets(), this.drinkTickets());
    this.router.navigate(['party', 'checkout']);
  }

}
