import { Component, OnInit, signal } from '@angular/core';
import { EventType, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  readonly homeRoute = 'home';
  readonly sportsRoute = 'sports';
  readonly partyRoute = 'party';

  currentPage = signal(this.homeRoute);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event.type === EventType.NavigationEnd)).subscribe(event => {
      if (event.url.endsWith(this.homeRoute)) {
        this.currentPage.set(this.homeRoute);
      } else if (event.url.endsWith(this.sportsRoute)) {
        this.currentPage.set(this.sportsRoute);
      } else if (event.url.endsWith(this.partyRoute)) {
        this.currentPage.set(this.partyRoute);
      }
    });

  }

}
