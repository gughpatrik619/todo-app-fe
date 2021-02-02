import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AppSettingsService} from '../../services/app-settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private appSettingsService: AppSettingsService
  ) {
  }

  ngOnInit(): void {
    this.authService.username.subscribe(data => this.username = data);
  }

  onLogout() {
    this.authService.logout();
    this.appSettingsService.clear();
    this.router.navigateByUrl('/login');
  }

  toggleLeftSidebar() {
    const state = this.appSettingsService.leftSidebarState.value;

    if (state === 'open') {
      this.appSettingsService.setLeftSidebarState('close');
    } else {
      this.appSettingsService.setLeftSidebarState('open');
    }

  }
}
