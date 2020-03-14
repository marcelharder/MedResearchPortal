import { Injectable, OnInit } from '@angular/core';
import { Coach } from '../_models/coach';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  OnInit() {
    this.getAllCoaches();
  }

  getAllCoaches(): Observable<Coach[]> { return this.http.get<Coach[]>(this.baseUrl + 'coach'); }
  getCoach(id): Observable<Coach> { return this.http.get<Coach>(this.baseUrl + 'coach/' + id); }


}
