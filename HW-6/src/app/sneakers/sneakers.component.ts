import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  private dataSub?: Subscription;

  heroHighlights = [
    { label: 'Weekly drops', value: '6 new pairs' },
    { label: 'Verified sellers', value: '100%' },
    { label: 'Members online', value: '2.4K' }
  ];

  constructor(private dataSevice: DataService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.queryParamSub = this.route.queryParamMap.subscribe((params) => {
      const query = params.get('q') ?? '';
      this.searchQuery = query;
      this.fetchSneakers(query);
    });
  }

  ngOnDestroy(): void {
    this.queryParamSub?.unsubscribe();
    this.dataSub?.unsubscribe();
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

  private fetchSneakers(query: string): void {
    this.loading = true;
    this.errorMessage = '';
    this.dataSub?.unsubscribe();

    const request$ = query ? this.dataSevice.searchSneakers(query) : this.dataSevice.getSneakers();

    this.dataSub = request$.subscribe({
      next: (data) => {
        this.sneakers = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = query
          ? 'Unable to search right now. Try again shortly.'
          : 'Something went wrong while loading the catalog. Please try again.';
        this.loading = false;
      }
    });
  }
}
