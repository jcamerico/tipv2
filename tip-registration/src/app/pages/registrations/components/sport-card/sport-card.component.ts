import { Component, input, output } from '@angular/core';
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
  unregister = output<void>();
  payment = output<void>();
  cancellation = output<void>();
  modification = output<void>();


  startUnregistration(): void {
    this.unregister.emit();
  }

  startPayment(): void {
    this.payment.emit();
  }

  cancel(): void {
    this.cancellation.emit();
  }

  modify(): void {
    this.modification.emit();
  }


}
