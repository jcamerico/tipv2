import { Component, input, model, output } from '@angular/core';
import { RegistrationSummary } from '../../sports.model';

@Component({
  selector: 'app-user-cancellation-modal',
  imports: [],
  templateUrl: './user-cancellation-modal.component.html'
})
export class UserCancellationModalComponent {

  sportRegistration = model.required<RegistrationSummary>();
  dismissed = output();
  confirmed = output();

}
