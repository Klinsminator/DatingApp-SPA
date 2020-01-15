import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  // Inject service into constructor
  // Added after AuthService the required to use alertifyjs instead of console logs
  constructor(private autService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    // console.log(this.model);
    this.autService.login(this.model).subscribe(next => {
      // console.log('Logged Succesfully');
      this.alertify.success('Logged Succesfully');
    }, error => {
      // console.log('Failed to Login');
      this.alertify.error('Failed to Login');
    });
  }

  // conditionally render the navbar to show welcome message on the template
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    // console.log('Logged Out');
    this.alertify.message('Logged Out');
  }

}
