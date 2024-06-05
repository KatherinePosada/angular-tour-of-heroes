import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location, NgFor } from '@angular/common';

import { Hero } from '../heroes/hero';
import { HeroNew, HeroService } from '../heroes/hero.service';
import { PowerService } from '../heroes/power.service';
import { Power } from '../powers/power';

@Component({
  selector: 'app-hero-new',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgFor,
  ],
  templateUrl: './hero-new.component.html',
  styleUrl: './hero-new.component.css'
})
export class HeroNewComponent {
  powers: Power[] = [];

  newHeroForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    alias: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    power: new FormControl(-1, Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private powerService: PowerService,
    private location: Location
  ){}

  ngOnInit(): void{
    this.getPowersService();
  }

  getPowersService(): void{
    this.powerService.getPowers()
      .subscribe(powersService => {
        this.powers = powersService;
      });
  }

  goBack(): void{
    this.location.back();
  }

  onSubmit(): void {
    if (this.newHeroForm.valid && !this.newHeroForm.pristine) {
      const hero = this.newHeroForm.value as HeroNew;

      this.heroService.createHero(hero)
        .subscribe(() => this.goBack());
    }
  }
}
