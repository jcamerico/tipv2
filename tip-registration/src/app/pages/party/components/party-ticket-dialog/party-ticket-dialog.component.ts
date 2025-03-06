import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-party-ticket-dialog',
  imports: [FormsModule],
  templateUrl: './party-ticket-dialog.component.html'
})
export class PartyTicketDialogComponent {
  ticketOwner = model('');
  addDrinks = model(false);

  constructor(private readonly activeModal: NgbActiveModal) { }

  cancel(): void {
    this.activeModal.dismiss();
  }

  addTicket(): void {
    this.activeModal.close({
      uid: '',
      party: true,
      owner: this.ticketOwner(),
      drinks: this.addDrinks() ? 5 : 0,
      scanned: false
    });
  }
}
