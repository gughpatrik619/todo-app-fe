import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  static readonly TOKEN_KEY = 'authToken';
  static readonly USERNAME_KEY = 'username';
  static readonly ROLES_KEY = 'roles';

  constructor(private localStorageService: LocalStorageService) {
  }

  clear(): void {
    this.localStorageService.clear();
  }

  storeToken(token: string) {
    this.localStorageService.clear(StorageService.TOKEN_KEY);
    this.localStorageService.store(StorageService.TOKEN_KEY, token);
  }

  retrieveToken() {
    return this.localStorageService.retrieve(StorageService.TOKEN_KEY);
  }

  storeUsername(username: string) {
    this.localStorageService.clear(StorageService.USERNAME_KEY);
    this.localStorageService.store(StorageService.USERNAME_KEY, username);
  }

  retrieveUsername() {
    return this.localStorageService.retrieve(StorageService.USERNAME_KEY);
  }

  storeRoles(roles: string[]) {
    this.localStorageService.clear(StorageService.ROLES_KEY);
    this.localStorageService.store(StorageService.ROLES_KEY, JSON.stringify(roles));
  }

  retrieveRoles() {
    return JSON.parse(this.localStorageService.retrieve(StorageService.ROLES_KEY));
  }
}
