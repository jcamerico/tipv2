import { Component, input } from '@angular/core';
import { RegistrationSummary } from '../../sports.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sport-card',
  imports: [CommonModule],
  templateUrl: './sport-card.component.html',
  styleUrl: './sport-card.component.css'
})
export class SportCardComponent {

  sport = input.required<RegistrationSummary>();

}
