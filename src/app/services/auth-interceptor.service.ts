import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {StorageService} from './storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // isTokenRefreshing = false;
  // refreshTokenSubject = new BehaviorSubject(null);

  constructor(private storageService: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.retrieveToken();
    if (token != null) {
      req = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
    }
    return next.handle(req);
  }
}
