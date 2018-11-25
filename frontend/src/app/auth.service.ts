import {Inject, Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from './token';
import { User} from './user';
import {LOCAL_STORAGE, StorageService} from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              @Inject(LOCAL_STORAGE) private storage: StorageService) {
  }
  public isAuthenticated(): boolean {
    const token = this.storage.get('auth-token');
    return token !== null;
  }
  login(user: User): Observable<Token> {
    return this.http.post<Token>('/api/login', user);
  }

  logout(): Observable<Token> {
    return this.http.get<Token>('/api/logout');
  }

  register(user: User): Observable<Token> {
    return this.http.post<Token>('/api/register', user);
  }

}

