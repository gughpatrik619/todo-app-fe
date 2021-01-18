import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SignupRequestPayload} from '../model/payload/signup-request-payload';
import {Observable} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {LoginRequestPayload} from '../model/payload/login-request-payload';
import {LoginResponsePayload} from '../model/payload/login-response-payload';
import {map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8081/auth/signup', signupRequestPayload, httpOptions);
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponsePayload>('http://localhost:8081/auth/login', loginRequestPayload, httpOptions)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.jwtToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        return true;
      }));
  }
}
