// This file would intercept all errors from server and would manage them

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    // Intercept all http error, request and catch, 
    // anytingh not a 200 or 300 Angular would know that it is an error
  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    return next.handle(req).pipe(
        catchError(error => {
            // If a status 401 () just return the error back
            if (error.status === 401) {
                return throwError(error.statusText);
            }
            if (error instanceof HttpErrorResponse) {
                // applications errors only for 500, exceptions from the server
                const applicationError = error.headers.get('Application-Error');
                if (applicationError) {
                    return throwError(applicationError);
                }
                // Modal states errors

                // Error is a low level of error
                const serverError = error.error;

                // Password too shorts or not required...
                let modalStateErrors = '';

                if (serverError.errors && typeof serverError.errors === 'object') {
                    // Build a list of strings from errors on the server
                    for (const key in serverError.errors) {
                        if (serverError.errors[key]) {
                            modalStateErrors += serverError.errors[key] + '\n';
                        }
                    }
                }

                return throwError(modalStateErrors || serverError || 'Unknown Server Error');
            }
        })
    )
  }
}

// Register a new intercepter provider to add to the providers array on app.module.ts
export const ErrorInterceptorProvider = {
    // Provide key and assign to interceptors
    provide: HTTP_INTERCEPTORS,
    // Use error interceptor class
    useClass: ErrorInterceptor,
    // Can ahve multiple interceptors
    multi: true
};