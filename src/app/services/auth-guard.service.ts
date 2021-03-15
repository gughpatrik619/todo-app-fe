import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {
  }

  canActivate() {

    if ((!this.authService.isLoggedIn.value) || (this.storageService.retrieveTokenExpiry() < new Date().toISOString())) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }

    return this.authService.isLoggedIn.value;
  }
}
