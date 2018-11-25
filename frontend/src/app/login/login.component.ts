import {Component, Input, OnInit,  Inject, Injectable } from '@angular/core';
import { StorageService, LOCAL_STORAGE} from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() user: User = new User();
  public text: string;
  constructor(private router: Router,
              private authService: AuthService,
              @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.text = '';
  }


  login(user: User): void {
    if (user.username && user.password) {
      this.authService.login(user)
        .subscribe(
          token => {
            this.storage.set('auth-token', token.token);
            console.log(token.token);
            if (!this.authService.isAuthenticated()) {
              this.text = 'Неверный логин или пароль.';
            } else {
              this.router.navigateByUrl('/settings');
              window.location.reload();
            }
          }
        );
    }
  }
}
