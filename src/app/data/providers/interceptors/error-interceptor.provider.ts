import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Provider } from "@angular/core";
import { ErrorInterceptor } from "src/app/common/errors/error.interceptor.service";

export const ErrorInterceptorProvider: Provider = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
]
