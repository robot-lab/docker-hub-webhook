import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgSelectModule} from '@ng-select/ng-select';
import { AppComponent } from './app.component';
import {LoginComponent} from "./login/login.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiInterceptorService} from "./api-interceptor.service";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import { StorageServiceModule} from "angular-webstorage-service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatGridListModule,
  MatCardModule,
  MatTableModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatDatepickerModule,
  MatNativeDateModule, MatDialogModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
      FormsModule,
    NgSelectModule,
    HttpClientModule,
    StorageServiceModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [HttpClientModule,
    {provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
