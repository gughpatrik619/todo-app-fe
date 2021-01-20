import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, switchMap} from 'rxjs/operators';
import {LoginResponsePayload} from '../model/payload/login-response-payload';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject = new BehaviorSubject(null);

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.authService.getJwtToken()) {
      this.addToken(req, this.authService.getJwtToken());
    }

    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 403) {
        return this.handleAuthErrors(req, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: LoginResponsePayload) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(refreshTokenResponse.jwtToken);
          return next.handle(this.addToken(req, refreshTokenResponse.jwtToken));
        })
      );
    }
  }

  private addToken(req: HttpRequest<any>, jwtToken: string) {
    return req.clone({headers: req.headers.set('Authorization', `Bearer ${jwtToken}`)});
  }
}
