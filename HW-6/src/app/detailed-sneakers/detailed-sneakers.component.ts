import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
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

  private subscription?: Subscription;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        switchMap((id) => {
          if (Number.isNaN(id)) {
            this.errorMessage = 'Sneaker not found.';
            this.loading = false;
            return EMPTY;
          }

          this.loading = true;
          this.errorMessage = '';
          return this.dataService.getSneaker(id);
        })
      )
      .subscribe({
        next: (sneaker) => {
          this.sneaker = sneaker;
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Unable to load this sneaker at the moment.';
          this.loading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
