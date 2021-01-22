import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isAdmin = false;
  isModerator = false;
  isLoggedIn: boolean;
  username: string;
  roles: string[];
  isSidebarOpen = false;

  constructor(private storageService: StorageService, public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(data => this.isLoggedIn = data);
    this.authService.isAdmin.subscribe(data => this.isAdmin = data);
    this.authService.isModerator.subscribe(data => this.isModerator = data);
    this.authService.username.subscribe(data => this.username = data);

    if (this.isLoggedIn) {
      this.roles = this.storageService.retrieveRoles();
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
