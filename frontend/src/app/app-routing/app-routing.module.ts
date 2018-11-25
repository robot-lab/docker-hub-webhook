import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "../app.component";
import {AuthGuard} from "../auth.guard";
import {LoginComponent} from "../login/login.component";

const routes: Routes =[
  {path: '', redirectTo: 'settings', pathMatch: 'full'},
  { path: 'settings', component: AppComponent, canActivate: [AuthGuard]},
  { path: 'login',  component: LoginComponent}
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
