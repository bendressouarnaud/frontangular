import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MeswebservService } from './meswebserv.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    /*headers = new Headers({
        'Content-Type': 'application/json',
        'Token': localStorage.getItem("Token")
    });
    */

    /* C o n s t r u c t o r */
    constructor(private meswebservices: MeswebservService) { }


    /* M e t h o d  */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (localStorage.getItem('userid') && (localStorage.getItem('mtoken').length > 0)) {
            //if(localStorage.getItem('userid') && (this.meswebservices.getToken().length > 0)){

            //  mtoken
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + localStorage.getItem('mtoken')
                }
            });
        }

        return next.handle(request).pipe(
            catchError(
                error => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.status === 401 || error.status === 403) {
                            //window.location.href = "#/pages/login";
                            window.location.href = "/";
                        }                                              
                    }
                    return throwError(error);  
                }
            )
        ) as any;
    }
}