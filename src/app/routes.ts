// This file contains the routes for the application (Routing topic)
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

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
            { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver} },
            // Using resolvers to retrieve data
            { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
            { path: 'member/edit', component: MemberEditComponent, 
                resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges] },
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
