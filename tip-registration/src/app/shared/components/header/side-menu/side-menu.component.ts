import { Component, OnInit, signal } from '@angular/core';
import { EventType, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  imports: [RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent implements OnInit {

  readonly homeRoute = 'home';
  readonly registrationsRoute = 'registrations';
  readonly partyRoute = 'party';

  currentPage = signal(this.homeRoute);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event.type === EventType.NavigationEnd)).subscribe(event => {
      if (event.url.endsWith(this.homeRoute)) {
        this.currentPage.set(this.homeRoute);
      } else if (event.url.endsWith(this.registrationsRoute)) {
        this.currentPage.set(this.registrationsRoute);
      } else if (event.url.endsWith(this.partyRoute)) {
        this.currentPage.set(this.partyRoute);
      }
    });
  }

}
