import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Sneaker } from '../shared/models/sneakers.model';
import { DataService } from '../data.service';
import { SneakerCardSmComponent } from '../sneaker-card-sm/sneaker-card-sm.component';


@Component({
  standalone: true,
  selector: 'app-sneakers',
  imports: [SneakerCardSmComponent],
  templateUrl: './sneakers.component.html',
  styleUrl: './sneakers.component.css'
})
export class SneakersComponent implements OnInit, OnDestroy {
  sneakers: Sneaker[] = [];

  loading = false;
  errorMessage = '';
  searchQuery = '';
  private queryParamSub?: Subscription;

  heroHighlights = [
    { label: 'Weekly drops', value: '6 new pairs' },
    { label: 'Verified sellers', value: '100%' },
    { label: 'Members online', value: '2.4K' }
  ];

  constructor(private dataSevice: DataService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.queryParamSub = this.route.queryParamMap
      .pipe(
        map((params) => params.get('q') ?? ''),
        distinctUntilChanged(),
        tap((query) => (this.searchQuery = query)),
        debounceTime(300),
        tap(() => {
          this.loading = true;
          this.errorMessage = '';
        }),
        switchMap((query) => {
          const request$ = query ? this.dataSevice.searchSneakers(query) : this.dataSevice.getSneakers();
          return request$.pipe(
            catchError(() => {
              this.errorMessage = query
                ? 'Unable to search right now. Try again shortly.'
                : 'Something went wrong while loading the catalog. Please try again.';
              return of([]);
            })
          );
        })
      )
      .subscribe((data) => {
        this.sneakers = data;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.queryParamSub?.unsubscribe();
  }

  handleSearch(query: string): void {
    this.searchQuery = query;
    const trimmed = query.trim();
    const current = this.route.snapshot.queryParamMap.get('q') ?? '';

    if (trimmed === current) {
      return;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: trimmed || null },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

}
