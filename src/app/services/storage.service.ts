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
  static readonly NAV_SIDEBAR_IS_OPEN = 'navSidebarIsOpen';
  static readonly INFO_SIDEBAR_IS_OPEN = 'infoSidebarIsOpen';

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

  storeNavSidebarIsOpen(isOpen: boolean) {
    this.localStorageService.clear(StorageService.NAV_SIDEBAR_IS_OPEN);
    this.localStorageService.store(StorageService.NAV_SIDEBAR_IS_OPEN, isOpen);
  }

  retrieveNavSidebarIsOpen() {
    return this.localStorageService.retrieve(StorageService.NAV_SIDEBAR_IS_OPEN);
  }

  storeInfoSidebarIsOpen(isOpen: boolean) {
    this.localStorageService.clear(StorageService.INFO_SIDEBAR_IS_OPEN);
    this.localStorageService.store(StorageService.INFO_SIDEBAR_IS_OPEN, isOpen);
  }

  retrieveInfoSidebarIsOpen() {
    return this.localStorageService.retrieve(StorageService.INFO_SIDEBAR_IS_OPEN);
  }
}
