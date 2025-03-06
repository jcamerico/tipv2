import { Component, computed, model, OnInit, signal } from '@angular/core';
import { BasketTicket, CouponReduction } from '../../party.model';
import { FormsModule } from '@angular/forms';
import { PartyService } from '../../party.service';
import { Alert, AlertType } from '../../../home/home.model';
import { AlertComponent } from '../../../home/components/alert/alert.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ticket-checkout',
  imports: [FormsModule, AlertComponent, RouterModule],
  templateUrl: './ticket-checkout.component.html'
})
export class TicketCheckoutComponent implements OnInit {

  drinkTickets = signal<BasketTicket[]>([]);
  partyTickets = signal<BasketTicket[]>([]);
  totalPrice = computed(() => [...this.drinkTickets(), ...this.partyTickets()].reduce((sum, ticket) => sum + ticket.price, 0) - this.couponReductions().reduce((sum, reduction) => sum + reduction.reduction, 0));
  coupon = model('');
  couponReductions = signal<CouponReduction[]>([]);
  couponError = signal<Alert | undefined>(undefined);

  constructor(private readonly partyService: PartyService) { }

  ngOnInit(): void {
    const tickets = this.partyService.getBasketTickets();
    this.partyTickets.set(tickets.partyTickets);
    this.drinkTickets.set(tickets.drinkTickets);
  }

  applyCoupon(): void {
    this.partyService.getCouponReduction(this.coupon()).subscribe({
      next: (reduction) => {
        this.couponError.set(undefined);
        this.couponReductions.update(reductions => [...reductions, reduction]);
        this.coupon.set('');
      },
      error: (error) => {
        this.couponError.set(new Alert(AlertType.Error, 'Invalid coupon code: ' + this.coupon()));
        console.error('Failed to apply coupon:', error);
        this.coupon.set('');
      }
    });
  }

}

