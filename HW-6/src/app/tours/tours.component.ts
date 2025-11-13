import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, shareReplay, startWith, switchMap } from 'rxjs';
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
  // enableTours:boolean = true;
  
  // protected readonly tours$: Observable<tour[]>;
  // private readonly searchTerms = new Subject<string>();
  // private readonly allTours$: Observable<tour[]>;

  // constructor(private readonly dataService: DataService) {
  //   this.allTours$ = this.dataService.getTours().pipe(
  //     shareReplay({ bufferSize: 1, refCount: true })
  //   );

  //   this.tours$ = this.searchTerms.pipe(
  //     startWith(''),
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     switchMap((term) =>
  //       this.allTours$.pipe(map((tours) => this.filterTours(tours, term)))
  //     )
  //   );
  // }

  // onSearchTerm(term: string): void {
  //   this.searchTerms.next(term);
  // }

  // private filterTours(tours: tour[], rawTerm: string): tour[] {
  //   const term = rawTerm.trim().toLowerCase();

  //   if (!term) {
  //     return tours;
  //   }

  //   return tours.filter((tour) => {
  //     const titleMatch = tour.title.toLowerCase().includes(term);
  //     const descriptionMatch = tour.description
  //       ? tour.description.toLowerCase().includes(term)
  //       : false;
  //     const locationMatch = tour.location
  //       ? tour.location.toLowerCase().includes(term)
  //       : false;
  //     const durationMatch = tour.duration
  //       ? tour.duration.toLowerCase().includes(term)
  //       : false;

  //     return titleMatch || descriptionMatch || locationMatch || durationMatch;
  //   });
  // }
}
