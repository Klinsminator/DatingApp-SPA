import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  // Inject service into constructor
  constructor(private autService: AuthService) { }

  ngOnInit() {
  }

  login() {
    // console.log(this.model);
    this.autService.login(this.model).subscribe(next => {
      console.log('Logged Succesfully');
    }, error => {
      console.log('Failed to Login');
    });
  }

  // conditionally render the navbar to show welcome message on the template
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Logged Out');
  }

}
