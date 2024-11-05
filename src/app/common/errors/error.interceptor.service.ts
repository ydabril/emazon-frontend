import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {

      if (error.status === HttpStatusCode.Unauthorized || error.status === HttpStatusCode.Forbidden) {
        this._router.navigate(['/landing'], {
          queryParams: { showErrorModal: true, errorCode: error.status }
        });
      }

      return throwError(() => error);
    }));
  }
}
