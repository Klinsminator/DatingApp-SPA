import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

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

  getUsers(): Observable<User[]> {
    // this should be an observable of user but it get an observable of object
    // return this.http.get(this.baseUrl + 'users');
    // Better handling of the token
    // Better handling of the token on app.module, makes this obsolete
    return this.http.get<User[]>(this.baseUrl + 'users/');
  }

  getUser(id): Observable<User> {
    // Better handling of the token on app.module, makes this obsolete
    // return this.http.get<User>(this.baseUrl + 'user/' + id, httpOptions);
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

}
