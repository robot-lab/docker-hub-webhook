import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LOCAL_STORAGE, StorageService} from "angular-webstorage-service";

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor{

  private token: string;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.token = this.storage.get('auth-token') ;
    console.log(this.token);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.storage.get('auth-token') ;
    console.log(this.token);
    if (this.token !== null && this.token !== undefined) {
      const request1 = req.clone({headers: req.headers.set('Authorization', 'Token ' + this.token)});
      return next.handle(request1);
    }
    return next.handle(req);
  }

}
