import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-party-summary',
  imports: [RouterModule],
  templateUrl: './party-summary.component.html',
  styleUrl: './party-summary.component.css'
})
export class PartySummaryComponent {
  partyTickets = input.required<number>();
}
