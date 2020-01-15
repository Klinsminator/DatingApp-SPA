import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Allows to inject thing into the services
// When creating a service, this must be included on app.module.ts on providers array
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:44344/api/auth/';

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
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }
}
