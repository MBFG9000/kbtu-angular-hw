import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, EMPTY, map, switchMap } from 'rxjs';
import { DataService } from '../data.service';
import { Sneaker } from '../shared/models/sneakers.model';

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

  constructor(private route: ActivatedRoute, private dataService: DataService, private location: Location) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        switchMap((id) => {
          if (Number.isNaN(id)) {
            this.errorMessage = 'Sneaker not found.';
            this.notFound = true;
            this.loading = false;
            return EMPTY;
          }

          this.loading = true;
          this.errorMessage = '';
          this.notFound = false;
          return this.dataService.getSneaker(id);
        })
      )
      .subscribe({
        next: (sneaker) => {
          this.sneaker = sneaker;
          this.loading = false;
          this.notFound = !sneaker;
        },
        error: (error) => {
          this.errorMessage = error?.status === 404 ? 'Sneaker not found.' : 'Unable to load this sneaker at the moment.';
          this.notFound = error?.status === 404;
          this.loading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
