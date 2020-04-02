import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';

// Allows to inject thing into the services
// When creating a service, this must be included on app.module.ts on providers array
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // baseUrl = 'https://localhost:44344/api/auth/';
  baseUrl = environment.apiUrl + 'auth/';

  // this is to use the auth0 jwt module installed on terminal
  jwtHelper = new JwtHelperService();

  // Decoded token for retrieving information
  decodedToken: any;

  // put the image on navbar
  currentUser: User;

  // BehaviorSubject variable for nav photo
  photoUrl = new BehaviorSubject<string>('src/assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  // Method that would update photo with the next selected
  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    // Passing just request and model on body for post
    // Remember the post would send back a token!!!For that use pipelines
    return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          // adding user to the page
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          // adding user to the page
          this.currentUser = user.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  // Using jwt library
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
