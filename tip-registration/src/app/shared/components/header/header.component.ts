import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { EventType, Router, RouterModule } from '@angular/router';
import Keycloak from 'keycloak-js';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  readonly homeRoute = 'home';
  readonly sportsRoute = 'sports';
  readonly partyRoute = 'party';

  private readonly keycloak = inject(Keycloak);

  firstName = signal('');
  lastName = signal('');
  authenticated = signal(false);
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
    this.keycloak.loadUserProfile().then(profile => {
      this.firstName.set(profile.firstName ?? '');
      this.lastName.set(profile.lastName ?? '');
      this.authenticated.set(true);
    });
  }

  logout(): void {
    this.keycloak.logout({
      redirectUri: window.location.origin + '/logged-out'
    }).then(() => {
      this.authenticated.set(false);
    });
  }
  goToAccountManagement(): void {
    window.location.href = this.keycloak.createAccountUrl();
  }


}
