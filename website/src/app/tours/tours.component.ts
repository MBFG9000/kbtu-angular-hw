import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { tour } from '../shared/models/tours';
import { TourComponent } from '../tour/tour.component';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, AsyncPipe, TourComponent],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css'
})
export class ToursComponent {
  enableTours:boolean = true;
  
  protected readonly tours$: Observable<tour[]>;

  constructor(private readonly dataService: DataService) {
    this.tours$ = this.dataService.getTours();
  }
}
