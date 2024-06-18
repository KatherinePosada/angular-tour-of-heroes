import { Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
// import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { PowersComponent } from './powers/powers.component';
import { HeroNewComponent } from './hero-new/hero-new.component';
import { authGuard } from './authentication/auth.guard';
import { LoginComponent } from './login/login.component';
import { NoFoundComponent } from './no-found/no-found.component';

export const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: 'heroes',
    component: HeroesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'details/:id',
    loadComponent:() => import('./hero-details/hero-details.component')
      .then(module => module.HeroDetailsComponent)
  },
  {
    path: 'dashboard', 
    //lazyload:
    loadComponent:() => import ('./dashboard/dashboard.component')
      .then(module => module.DashboardComponent)
  },
  {path: 'powers', component: PowersComponent},
  {path: 'hero/new', component: HeroNewComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NoFoundComponent},
];
