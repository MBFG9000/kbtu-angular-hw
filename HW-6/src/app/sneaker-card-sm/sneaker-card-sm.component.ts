import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Sneaker } from '../shared/models/sneakers.model';

@Component({
  selector: 'app-sneaker-card-sm',
  imports: [CurrencyPipe],
  templateUrl: './sneaker-card-sm.component.html',
  styleUrl: './sneaker-card-sm.component.css'
})

export class SneakerCardSmComponent {
  @Input() sneaker!: Sneaker;
}
