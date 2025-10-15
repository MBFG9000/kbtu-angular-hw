import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { tour } from './shared/models/tours';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly apiBaseUrl = 'http://localhost:3000';
  private readonly toursUrl = `${this.apiBaseUrl}/api/tours`;

  constructor(private readonly http: HttpClient) {}

  getTours(): Observable<tour[]> {
    return this.http.get<tour[]>(this.toursUrl).pipe(
      map((tours) => tours.map((tour) => this.mapTour(tour)))
    );
  }

  getTourById(id: number): Observable<tour> {
    return this.http.get<tour>(`${this.toursUrl}/${id}`).pipe(
      map((tour) => this.mapTour(tour))
    );
  }

  private mapTour(tour: tour): tour {
    return {
      ...tour,
      photo: tour.photo ? this.toAbsoluteUrl(tour.photo) : tour.photo,
      photoGallery: tour.photoGallery?.map((photo) => this.toAbsoluteUrl(photo))
    };
  }

  private toAbsoluteUrl(path: string): string {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    return `${this.apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }
}
