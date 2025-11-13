import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sneaker } from '../shared/models/sneakers.model';
import { DataService } from '../data.service';
import { SneakerCardSmComponent } from '../sneaker-card-sm/sneaker-card-sm.component';


@Component({
  selector: 'app-sneakers',
  imports: [SneakerCardSmComponent],
  templateUrl: './sneakers.component.html',
  styleUrl: './sneakers.component.css'
})
export class SneakersComponent implements OnInit {
  sneakers: Sneaker[] = [];

  loading = false;

  constructor(private dataSevice: DataService) {}

  ngOnInit(): void {
    this.loadSneakers();
  }

  loadSneakers(): void {
    this.loading = true;

    this.dataSevice.getSneakers().subscribe({
      next: (data) => {
        this.sneakers = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
