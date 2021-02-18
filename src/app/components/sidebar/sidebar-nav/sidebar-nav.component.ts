import {Component, OnInit} from '@angular/core';
import {AppSettingsService} from '../../../services/app-settings.service';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit {

  activeHomepage: string;
  sidebarIsOpen: boolean;

  constructor(private appSettingsService: AppSettingsService) {
  }

  ngOnInit(): void {
    this.appSettingsService.activeHomepage.subscribe(page => this.activeHomepage = page);
    this.appSettingsService.navSidebarIsOpen.subscribe(isOpen => this.sidebarIsOpen = isOpen);
  }

  togglePage(page: string) {
    this.appSettingsService.setActiveHomepage(page);
  }

  toggleSidebar() {
    this.appSettingsService.setNavSidebarIsOpen(!this.sidebarIsOpen);
  }
}
