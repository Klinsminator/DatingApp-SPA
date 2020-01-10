import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  // Declare a class property equivalent as any value var
  values: any;
  // use dependency injection to use the httpclient to make http request to the server
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // On initialization, call the getvalues()
    this.getvalues();
  }

  getvalues() {
    // To get the content from the GET, must subscribe to the observer
    // Observer is a strea of data sent by the service or API
    // Response is what you get from API
    // Error gets any error back from API
    this.http.get('http://localhost:5055/api/values').subscribe(response => {
      this.values = response;
      // Must convert to array because json format is complex, not just an array but array of arrays
      this.values = Array.of(this.values);
    }, error =>{
      console.log(error);
    });
  }

}
