import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { tour } from '../shared/models/tours';

@Component({
  selector: 'app-tour',
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.css'
})
export class TourComponent {
  @Input() tour!:tour;
}
