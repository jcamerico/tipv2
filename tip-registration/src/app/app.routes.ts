import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SportsComponent } from './pages/registrations/sports.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { PartyComponent } from './pages/party/party.component';
import { canActivateAuthenticated } from './shared/auth.guard';
import { LogoutComponent } from './shared/components/logout/logout.component';
import { AchievementsComponent } from './pages/achievements/achievements.component';
import { TicketBuyComponent } from './pages/party/components/ticket-buy/ticket-buy.component';
import { TicketCheckoutComponent } from './pages/party/components/ticket-checkout/ticket-checkout.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [canActivateAuthenticated] },
    { path: 'registrations', component: SportsComponent, canActivate: [canActivateAuthenticated] },

    { path: 'party', component: PartyComponent, canActivate: [canActivateAuthenticated], pathMatch: 'full' },
    { path: 'party/new', component: TicketBuyComponent, canActivate: [canActivateAuthenticated], pathMatch: 'full' },
    { path: 'party/checkout', component: TicketCheckoutComponent, canActivate: [canActivateAuthenticated], pathMatch: 'full' },

    { path: 'achievements', component: AchievementsComponent, canActivate: [canActivateAuthenticated] },
    { path: 'logged-out', component: LogoutComponent },
    //{ path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
