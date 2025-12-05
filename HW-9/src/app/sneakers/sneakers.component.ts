import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { Sneaker } from '../shared/models/sneakers.model';
import { SneakerCardSmComponent } from '../sneaker-card-sm/sneaker-card-sm.component';
import { Store } from '@ngrx/store';
import { selectListError, selectListLoading, selectSneakers } from '../shared/state/sneakers.selectors';
import * as SneakersActions from '../shared/state/sneakers.actions';


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
  private subscriptions = new Subscription();

  heroHighlights = [
    { label: 'Weekly drops', value: '6 new pairs' },
    { label: 'Verified sellers', value: '100%' },
    { label: 'Members online', value: '2.4K' }
  ];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(selectSneakers).subscribe((items) => (this.sneakers = items))
    );

    this.subscriptions.add(
      this.store.select(selectListLoading).subscribe((isLoading) => (this.loading = isLoading))
    );

    this.subscriptions.add(
      this.store.select(selectListError).subscribe((error) => (this.errorMessage = error ?? ''))
    );

    this.subscriptions.add(
      this.route.queryParamMap
        .pipe(
          map((params) => params.get('q') ?? ''),
          map((query) => query.trim()),
          distinctUntilChanged(),
          tap((query) => (this.searchQuery = query)),
          debounceTime(300),
          tap((query) => this.store.dispatch(SneakersActions.loadSneakers({ query })))
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
