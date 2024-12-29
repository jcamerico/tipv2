import { Component, OnInit } from '@angular/core';
import { SportsService } from './sports.service';
import { SportSummary } from './sports.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sports',
  imports: [CommonModule],
  templateUrl: './sports.component.html',
  styleUrl: './sports.component.css'
})
export class SportsComponent implements OnInit {

  sports: SportSummary[] = [];

  constructor(private sportsService: SportsService) { }

  ngOnInit(): void {
    this.sportsService.getSports().subscribe(sports => {
      this.sports = sports;
    });
  }



  addSport(): void {
    // Add a sport
  }

}
