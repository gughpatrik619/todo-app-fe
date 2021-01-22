import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getPublicContent(): Observable<any> {
    return this.httpClient.get(`${AuthService.BACKEND_AUTH_URL}/test/all`, {responseType: 'json'});
  }

  getUserBoard(): Observable<any> {
    return this.httpClient.get(`${AuthService.BACKEND_AUTH_URL}/test/user`, {responseType: 'json'});
  }

  getModeratorBoard(): Observable<any> {
    return this.httpClient.get(`${AuthService.BACKEND_AUTH_URL}/test/mod`, {responseType: 'json'});
  }

  getAdminBoard(): Observable<any> {
    return this.httpClient.get(`${AuthService.BACKEND_AUTH_URL}/test/admin`, {responseType: 'json'});
  }
}
