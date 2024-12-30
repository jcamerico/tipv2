import { Component, OnInit } from '@angular/core';
import { SportsService } from './sports.service';
import { RegistrationStatus, RegistrationSummary } from './sports.model';
import { CommonModule } from '@angular/common';
import { SportCardComponent } from './components/sport-card/sport-card.component';

@Component({
  selector: 'app-sports',
  imports: [CommonModule, SportCardComponent],
  templateUrl: './sports.component.html',
  styleUrl: './sports.component.css'
})
export class SportsComponent implements OnInit {

  sports: RegistrationSummary[] = [];
  registeredSports: RegistrationSummary[] = [];
  awaitingPayment: RegistrationSummary[] = [];
  pendingApproval: RegistrationSummary[] = [];
  canceledOrRefused: RegistrationSummary[] = [];

  constructor(private sportsService: SportsService) { }

  ngOnInit(): void {
    this.sportsService.getSports().subscribe(sports => {
      this.sports = sports;
      this.registeredSports = sports.filter(sport => sport.status === RegistrationStatus.REGISTERED);
      this.awaitingPayment = sports.filter(sport => sport.status === RegistrationStatus.AWAITING_PAYMENT);
      this.pendingApproval = sports.filter(sport => sport.status === RegistrationStatus.PENDING_APPROVAL);
      this.canceledOrRefused = sports.filter(sport => sport.status === RegistrationStatus.CANCELLED || sport.status === RegistrationStatus.REFUSED);
    });
  }



  addSport(): void {
    // Add a sport
  }

}
