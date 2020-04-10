import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(private userService: UserService, private router: Router,
                private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        // This does not need to subscribe since is a resolve, it does automatically
        // So use pipe to catch the errors and redirect user
        return this.userService.getMessages(this.authService.decodedToken.nameid,
             this.pageNumber, this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.alertify.error('Problem retreiving messages');
                // When having issues, the user should be rerouted to members page
                this.router.navigate(['/home']);
                // Return an observable of null
                return of(null);
            })
        );
    }
}
