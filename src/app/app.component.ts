import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  // title = 'DatingApp-SPA';
  // As this is the highiest level of hierarchy, if a decodedtoken is needed
  // this is the place to set up to get the info from the token to the decodedtoken
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService){ }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
