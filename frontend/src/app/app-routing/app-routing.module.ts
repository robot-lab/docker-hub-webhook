import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "../app.component";
import {AuthGuard} from "../auth.guard";
import {LoginComponent} from "../login/login.component";
import {SettingsComponent} from "../settings/settings.component";
import {SettingsEditorComponent} from "../settings-editor/settings-editor.component";

const routes: Routes =[
  {path: '', redirectTo: 'settings', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'editsetting', component: SettingsEditorComponent,  canActivate: [AuthGuard] },
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
