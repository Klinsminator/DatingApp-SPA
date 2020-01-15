import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  // // Declare a class property equivalent as any value var
  // values: any;

  // use dependency injection to use the httpclient to make http request to the server
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // // On initialization, call the getvalues()
    // this.getvalues();
  }

  registerToggle() {
    this.registerMode = true;
  }

  // getvalues() {
  //   // To get the content from the GET, must subscribe to the observer
  //   // Observer is a stream of data sent by the service or API
  //   // Response is what you get from API
  //   // Error gets any error back from API
  //   this.http.get('http://localhost:5055/api/values').subscribe(response => {
  //     this.values = response;
  //     // Must convert to array because json format is complex, not just an array but array of arrays
  //     this.values = Array.of(this.values);
  //   }, error =>{
  //     console.log(error);
  //   });
  // }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

}
