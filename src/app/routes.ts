// This file contains the routes for the application (Routing topic)
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    // This is a route for home
    // { path: 'home', component: HomeComponent },
    // This is a route for "nothing" so it can look for the root, not a home...
    { path: '', component: HomeComponent },
    // Dummy root with child routes to protect with auth code
    {
        // Blank path so anything that comes in can be validated against the children's path
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListsComponent },
        ]
    },
    // canActivate: [AuthGuard] to be protected
    // { path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },
    // { path: 'messages', component: MessagesComponent },
    // { path: 'lists', component: ListsComponent },
    // Wildcard route... just for redirect to home what doesn't matches
    { path: '**', redirectTo: '', pathMatch: 'full' },
];