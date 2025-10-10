import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { tour } from '../shared/models/tours';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, AsyncPipe, NgOptimizedImage],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css'
})
export class ToursComponent {
  protected readonly tours$: Observable<tour[]>;

  constructor(private readonly dataService: DataService) {
    this.tours$ = this.dataService.getTours();
  }
}
