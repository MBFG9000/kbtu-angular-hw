import { Component, OnInit } from '@angular/core';
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
export class SneakersComponent implements OnInit {
  sneakers: Sneaker[] = [];

  loading = false;
  errorMessage = '';

  heroHighlights = [
    { label: 'Weekly drops', value: '6 new pairs' },
    { label: 'Verified sellers', value: '100%' },
    { label: 'Members online', value: '2.4K' }
  ];

  constructor(private dataSevice: DataService) {}

  ngOnInit(): void {
    this.loadSneakers();
  }

  loadSneakers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.dataSevice.getSneakers().subscribe({
      next: (data) => {
        this.sneakers = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Something went wrong while loading the catalog. Please try again.';
        this.loading = false;
      }
    });
  }
}
