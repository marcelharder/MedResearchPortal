import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/User';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class userService {

baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

getUsers(page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
     }
      return paginatedResult;
    })
  );
}

getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id); }

updateUser(id: number, user: User ) {
  return this.http.put(this.baseUrl + 'users/' + id, user); }

deleteUser(id: number) {
  return this.http.delete(this.baseUrl + 'users/' + id); }

}

