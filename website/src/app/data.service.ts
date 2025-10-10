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
      map((tours) =>
        tours.map((tour) => ({
          ...tour,
          photo: tour.photo ? `${this.apiBaseUrl}${tour.photo}` : tour.photo
        }))
      )
    );
  }
}
