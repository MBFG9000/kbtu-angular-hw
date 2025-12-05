import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Sneaker } from './shared/models/sneakers.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly apiBaseUrl = 'https://express-nine-zeta.vercel.app';
  private readonly ApiUrl = `${this.apiBaseUrl}/api/sneakers`;

  constructor(private readonly http: HttpClient) {}

  getSneakers(): Observable<Sneaker[]> {
    return this.http.get<Sneaker[]>(this.ApiUrl)  
  }

  getSneaker(id: number): Observable<Sneaker> {
    return this.http.get<Sneaker>(`${this.ApiUrl}/${id}`);
  }

  searchSneakers(query: string): Observable<Sneaker[]> {
    return this.http.get<Sneaker[]>(`${this.ApiUrl}?query=${query}`);
  }
}
