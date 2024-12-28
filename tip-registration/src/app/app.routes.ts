import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SportsComponent } from './sports/sports.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { PartyComponent } from './party/party.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'sports', component: SportsComponent },
    { path: 'party', component: PartyComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
