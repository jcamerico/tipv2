import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Alert, HomeInfo } from './home.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
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
