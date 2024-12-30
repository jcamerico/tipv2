import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sport-summary',
  imports: [RouterModule],
  templateUrl: './sport-summary.component.html',
  styleUrl: './sport-summary.component.css'
})
export class SportSummaryComponent {
  sports = input.required<string[]>();
}
