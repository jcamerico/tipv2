import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import Keycloak from 'keycloak-js';
import { SideMenuComponent } from "./side-menu/side-menu.component";

@Component({
  selector: 'app-header',
  imports: [CommonModule, SideMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  private readonly keycloak = inject(Keycloak);

  firstName = signal('');
  lastName = signal('');
  authenticated = signal(false);
  accountUrl = signal('');

  ngOnInit(): void {
    this.keycloak.loadUserProfile().then(profile => {
      this.firstName.set(profile.firstName ?? '');
      this.lastName.set(profile.lastName ?? '');
      this.accountUrl.set(this.keycloak.createAccountUrl());
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

}
