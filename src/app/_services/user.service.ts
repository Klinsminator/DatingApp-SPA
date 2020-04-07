import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

// Need to send the header with the token as in postman
// Better handling of the token on app.module, makes this obsolete
// const httpOptions = {
//   headers: new HttpHeaders({
//     // Remember the space after bearer
//     Authorization: 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Get the apiurl from the environment variables
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // First usage of getUsers with no pagination
  // getUsers(): Observable<User[]> {
  //   // this should be an observable of user but it get an observable of object
  //   // return this.http.get(this.baseUrl + 'users');
  //   // Better handling of the token
  //   // Better handling of the token on app.module, makes this obsolete
  //   return this.http.get<User[]>(this.baseUrl + 'users/');
  // }

  getUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }
    return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
      .pipe(
        map( response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getUser(id): Observable<User> {
    // Better handling of the token on app.module, makes this obsolete
    // return this.http.get<User>(this.baseUrl + 'user/' + id, httpOptions);
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }
}
