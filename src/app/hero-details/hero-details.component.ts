import { Component, Input } from '@angular/core';
import { HeroesComponent } from '../heroes/heroes.component';
import { Hero } from '../heroes/hero';
import { NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [NgIf, UpperCasePipe, FormsModule],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css'
})
export class HeroDetailsComponent {
  @Input() hero?: Hero;
}
