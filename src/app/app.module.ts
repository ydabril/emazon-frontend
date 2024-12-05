import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptorProvider } from './data/providers/interceptors/error-interceptor.provider';
import { InterceptorProvider } from './data/providers/interceptors/interceptor.provider';
import { SharedModule } from './shared/shared.module';
import { LoaderComponent } from './shared/components/atoms/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    ErrorInterceptorProvider,
    InterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
