import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Sneaker } from '../shared/models/sneakers.model';
import { Store } from '@ngrx/store';
import * as SneakersActions from '../shared/state/sneakers.actions';
import { selectDetailsError, selectDetailsLoading, selectSelectedSneaker } from '../shared/state/sneakers.selectors';

@Component({
  standalone: true,
  selector: 'app-detailed-sneakers',
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './detailed-sneakers.component.html',
  styleUrl: './detailed-sneakers.component.css'
})
export class DetailedSneakersComponent implements OnInit, OnDestroy {
  sneaker?: Sneaker;
  loading = true;
  errorMessage = '';
  notFound = false;

  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.subscription = new Subscription();

    this.subscription.add(
      this.store.select(selectSelectedSneaker).subscribe((sneaker) => (this.sneaker = sneaker ?? undefined))
    );

    this.subscription.add(
      this.store.select(selectDetailsLoading).subscribe((isLoading) => (this.loading = isLoading))
    );

    this.subscription.add(
      this.store.select(selectDetailsError).subscribe((error) => {
        this.errorMessage = error ?? '';
        this.notFound = this.errorMessage === 'Sneaker not found.';
      })
    );

    this.subscription.add(
      this.route.paramMap
        .pipe(
          map((params) => params.get('id')),
          map((idParam) => idParam ?? ''),
          map((idParam) => idParam.trim()),
          map((idParam) => Number(idParam)),
          map((id) => (Number.isNaN(id) ? null : id))
        )
        .subscribe((id) => {
          if (id === null) {
            this.sneaker = undefined;
            this.errorMessage = 'Sneaker not found.';
            this.notFound = true;
            this.loading = false;
            return;
          }

          this.errorMessage = '';
          this.notFound = false;
          this.store.dispatch(SneakersActions.loadSneaker({ id }));
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
