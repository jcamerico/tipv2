import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Alert, HomeInfo } from './home.model';
import { RouterModule } from '@angular/router';
import { AlertComponent } from "./components/alert/alert.component";
import { SportSummaryComponent } from "./components/sport-summary/sport-summary.component";
import { PartySummaryComponent } from "./components/party-summary/party-summary.component";

@Component({
  selector: 'app-home',
  imports: [AlertComponent, SportSummaryComponent, PartySummaryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  homeInfo!: HomeInfo;
  alerts: Alert[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getHomeContent().subscribe(homeInfo => {
      this.homeInfo = homeInfo;
    });
    this.homeService.getAlerts().subscribe(alerts => {
      this.alerts = alerts;
    });
  }

}
