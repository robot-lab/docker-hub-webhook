import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoginComponent} from "./login/login.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiInterceptorService} from "./api-interceptor.service";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import { StorageServiceModule} from "angular-webstorage-service";




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    StorageServiceModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [HttpClientModule,
    {provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
