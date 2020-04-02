import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  // Added as a variable for BehaviorSubject
  photoUrl: string;

  // Inject service into constructor
  // Added after AuthService the required to use alertifyjs instead of console logs
  // Added Router to rout the corresponding pages
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    // subscribing the photo so can change
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    // console.log(this.model);
    this.authService.login(this.model).subscribe(next => {
      // console.log('Logged Succesfully');
      this.alertify.success('Logged Succesfully');
    }, error => {
      // console.log('Failed to Login');
      this.alertify.error('Failed to Login');
    }, () => {
      // This is the third option on a function, the Complete (next, error, complete)
      this.router.navigate(['/members']);
    });
  }

  // conditionally render the navbar to show welcome message on the template
  // By now the only thing done is check if there is some local storaged token
  // but this is not the best way to use this... use Auth0 angular jwt
  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token;
    // next lines use jwt auth to chekc validation
    return this.authService.loggedIn();
  }

  logout() {
    // Cleaning up variables once the user is logged out
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    // console.log('Logged Out');
    this.alertify.message('Logged Out');
    this.router.navigate(['/home']);
  }

}
