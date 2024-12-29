import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideKeycloak } from 'keycloak-angular';
import { routes } from './app.routes';


export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      url: 'http://localhost:8080',
      realm: 'registration',
      clientId: 'tip-registration'
    },
    initOptions: {
      onLoad: 'login-required',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      redirectUri: window.location.origin + '/home'
    },
  });

export const appConfig: ApplicationConfig = {
  providers: [provideKeycloakAngular(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
