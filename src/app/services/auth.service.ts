import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SignupRequestPayload} from '../model/payload/signup-request-payload';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoginRequestPayload} from '../model/payload/login-request-payload';
import {LoginResponsePayload} from '../model/payload/login-response-payload';
import {StorageService} from './storage.service';

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static readonly BACKEND_AUTH_URL = 'http://localhost:8081/auth';
  isLoggedIn = new BehaviorSubject<boolean>(false);
  isAdmin = new BehaviorSubject<boolean>(false);
  isModerator = new BehaviorSubject<boolean>(false);
  username = new BehaviorSubject<string>(null);

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
    const token = this.storageService.retrieveToken();
    const roles = this.storageService.retrieveRoles();
    const username = this.storageService.retrieveUsername();

    if (token) {
      this.isLoggedIn.next(true);
    }

    if (username) {
      this.username.next(username);
    }

    if (roles) {
      this.isAdmin.next(roles.includes('ROLE_ADMIN'));
      this.isModerator.next(roles.includes('ROLE_MODERATOR'));
    }
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(`${AuthService.BACKEND_AUTH_URL}/signup`, signupRequestPayload, httpOptions);
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<any> {
    return this.httpClient.post<LoginResponsePayload>(`${AuthService.BACKEND_AUTH_URL}/login`, loginRequestPayload, httpOptions);
  }

  logout() {
    this.isLoggedIn.next(false);
    this.isAdmin.next(false);
    this.isModerator.next(false);
    this.username.next(null);
    this.storageService.clear();
  }
}
