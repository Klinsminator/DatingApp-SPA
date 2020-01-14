import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Must import manually since sometimes it doesn't allow it or does it
// Must add the httpClientModule in the imports array in order to use http client service from the import,
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
