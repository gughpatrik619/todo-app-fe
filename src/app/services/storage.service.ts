import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  static readonly TOKEN_KEY = 'authToken';
  static readonly USERNAME_KEY = 'username';
  static readonly ROLES_KEY = 'roles';
  static readonly ACTIVE_HOMEPAGE = 'activeHomePage';
  static readonly LEFT_SIDEBAR_STATE = 'leftSidebarState';

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

  storeActiveHomepage(page: string) {
    this.localStorageService.clear(StorageService.ACTIVE_HOMEPAGE);
    this.localStorageService.store(StorageService.ACTIVE_HOMEPAGE, page);
  }

  retrieveActiveHomePage() {
    return this.localStorageService.retrieve(StorageService.ACTIVE_HOMEPAGE);
  }

  storeLeftSidebarState(state: string) {
    this.localStorageService.clear(StorageService.LEFT_SIDEBAR_STATE);
    this.localStorageService.store(StorageService.LEFT_SIDEBAR_STATE, state);
  }

  retrieveLeftSidebarState() {
    return this.localStorageService.retrieve(StorageService.LEFT_SIDEBAR_STATE);
  }
}
