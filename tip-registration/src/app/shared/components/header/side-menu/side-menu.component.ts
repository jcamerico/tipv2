import { Component, computed, OnInit, signal } from '@angular/core';
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
  readonly achievementsRoute = 'achievements';

  private currentPage = signal('/home');
  homeSelected = computed(() => this.currentPage().includes(this.homeRoute));
  registrationSelected = computed(() => this.currentPage().includes(this.registrationsRoute));
  partySelected = computed(() => this.currentPage().includes(this.partyRoute));
  achievementsSelected = computed(() => this.currentPage().includes(this.achievementsRoute));


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event.type === EventType.NavigationEnd)).subscribe(event => this.currentPage.set(event.url));
  }

}
