import { Component, input } from '@angular/core';
import { SportReimbursementSummary } from '../../sports.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reimbursement-card',
  imports: [CommonModule],
  templateUrl: './reimbursement-card.component.html',
  styleUrl: './reimbursement-card.component.css'
})
export class ReimbursementCardComponent {

  reimbursement = input.required<SportReimbursementSummary>();

}
