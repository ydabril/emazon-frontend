import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Provider } from "@angular/core";
import { Interceptor } from "src/app/common/utils/interceptor.service";

export const InterceptorProvider: Provider = [
  { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
]
