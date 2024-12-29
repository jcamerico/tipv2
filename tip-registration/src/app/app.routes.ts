import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SportsComponent } from './pages/sports/sports.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { PartyComponent } from './pages/party/party.component';
import { canActivateAuthenticated } from './shared/auth.guard';
import { LogoutComponent } from './shared/components/logout/logout.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [canActivateAuthenticated] },
    { path: 'sports', component: SportsComponent, canActivate: [canActivateAuthenticated] },
    { path: 'party', component: PartyComponent, canActivate: [canActivateAuthenticated] },
    { path: 'logged-out', component: LogoutComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
