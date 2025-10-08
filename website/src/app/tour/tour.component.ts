import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { tour } from '../shared/models/tours';

@Component({
  selector: 'app-tour',
  imports: [NgOptimizedImage],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.css'
})
export class TourComponent {
  @Input() tour!:tour;
}
