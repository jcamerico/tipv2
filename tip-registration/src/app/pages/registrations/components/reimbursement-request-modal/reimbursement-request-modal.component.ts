import { Component, model, output } from '@angular/core';
import { RegistrationSummary } from '../../sports.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reimbursement-request-modal',
  imports: [FormsModule],
  templateUrl: './reimbursement-request-modal.component.html'
})
export class ReimbursementRequestModalComponent {

  sportRegistration = model.required<RegistrationSummary>();
  dismissed = output();
  confirmed = output<string>();

  reimbursementReason = '';

}
