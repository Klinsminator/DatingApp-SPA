import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/user';

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
    // This won't work since the mismatch between user and string types
    // const user = localStorage.getItem('user');
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
      // This would change the photo observable as per the one chosen instead of the default one
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }
}
