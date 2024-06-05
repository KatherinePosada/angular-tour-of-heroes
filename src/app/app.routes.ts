import { Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { PowersComponent } from './powers/powers.component';
import { HeroNewComponent } from './hero-new/hero-new.component';

export const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'heroes', component: HeroesComponent},
  {path: 'details/:id', component: HeroDetailsComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'powers', component: PowersComponent},
  {path: 'hero/new', component: HeroNewComponent},
];
