import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

// Allows to inject thing into the services
// When creating a service, this must be included on app.module.ts on providers array
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:44344/api/auth/';

  // this is to use the auth0 jwt module installed on terminal
  jwtHelper = new JwtHelperService();

  // Decoded token for retrieving information
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    // Passing just request and model on body for post
    // Remember the post would send back a token!!!For that use pipelines
    return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
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
