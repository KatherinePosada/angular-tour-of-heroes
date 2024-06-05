import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

import { Hero } from '../heroes/hero';
import { HeroService } from '../heroes/hero.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  heroes: Hero[] = [];

  constructor(private heroService:HeroService){}

  ngOnInit(): void{
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1,5));
  }

}
