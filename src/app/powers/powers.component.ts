import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Power } from './power';
import { PowerService } from '../power.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-powers',
  standalone: true,
  imports: [
    NgFor,
    RouterModule
  ],
  templateUrl: './powers.component.html',
  styleUrl: './powers.component.css'
})
export class PowersComponent {
  powers: Power[] = [];

  constructor(
    private powerService: PowerService, 
    private messageService: MessageService
  ){}

  getPowers(): void{
    this.powerService.getPowers()
      .subscribe(powers => this.powers = powers);
  }

  ngOnInit(): void {
    this.getPowers();
  }
}
