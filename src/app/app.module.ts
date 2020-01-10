import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Must import manually since sometimes it doesn't allow it or does it
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent
   ],
   imports: [
      BrowserModule,
      // Must add the http in order to use http client service (import above)
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
