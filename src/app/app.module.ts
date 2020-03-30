import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Must import manually since sometimes it doesn't allow it or does it
// Must add the httpClientModule in the imports array in order to use http client service from the import,
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { NgxGalleryModule } from 'ngx-gallery';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

// Better handling of the token
export function tokenGetter() {
   return localStorage.getItem('token');
}

// How to fix ERROR TypeError: Class constructor HammerGestureConfig cannot be invoked without 'new'
export class CustomHammerConfig extends HammerGestureConfig {
   overrides = {
      pinch: { enable: false },
      rotat: { enable: false }
   };
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:44344'],
            blacklistedRoutes: ['localhost:44344/api/auth']
         }
      }),
      TabsModule.forRoot(),
      NgxGalleryModule
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      PreventUnsavedChanges,
      // How to fix ERROR TypeError: Class constructor HammerGestureConfig cannot be invoked without 'new'
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
