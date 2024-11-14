import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { UtilsService } from "./utils.service";


@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private _utils: UtilsService ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const requestClone = token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request
    this._utils._requestOnAction.next(true);
    

    return next.handle(requestClone).pipe(finalize(() => this._utils._requestOnAction.next(false)));
  }
}
