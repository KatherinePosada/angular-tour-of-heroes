import { Component } from '@angular/core';
import { NgFor } from '@angular/common';


import { Hero } from './hero';
import { HEROES } from '../mock-heroes';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    NgFor,
    HeroDetailsComponent
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes = HEROES;
  selectedHero?: Hero;

  onSelect(hero: Hero): void{
    this.selectedHero = hero;
  }
}
