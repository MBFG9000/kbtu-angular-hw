import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, Observable, of, shareReplay, startWith, switchMap } from 'rxjs';
import { DataService } from '../data.service';
import { tour } from '../shared/models/tours';

@Component({
  selector: 'app-tour-about',
  standalone: true,
  imports: [CommonModule, AsyncPipe, NgOptimizedImage, RouterLink],
  templateUrl: './tour-about.component.html',
  styleUrl: './tour-about.component.css'
})
export class TourAboutComponent {
  // private readonly route = inject(ActivatedRoute);
  // private readonly dataService = inject(DataService);

  // protected readonly tour$: Observable<tour | null | undefined> = this.route.paramMap.pipe(
  //   map((params) => Number(params.get('id'))),
  //   switchMap((id) => {
  //     if (Number.isNaN(id)) {
  //       return of(null);
  //     }

  //     return this.dataService.getTourById(id).pipe(
  //       catchError(() => of(null))
  //     );
  //   }),
  //   shareReplay({ bufferSize: 1, refCount: true }),
  //   startWith(undefined)
  // );
}
