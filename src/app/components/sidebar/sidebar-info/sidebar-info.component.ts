import {Component, OnInit} from '@angular/core';
import {AppSettingsService} from '../../../services/app-settings.service';

@Component({
  selector: 'app-sidebar-info',
  templateUrl: './sidebar-info.component.html',
  styleUrls: ['./sidebar-info.component.css']
})
export class SidebarInfoComponent implements OnInit {

  sidebarIsOpen: boolean;

  constructor(private appSettingsService: AppSettingsService) {
  }

  ngOnInit(): void {
    this.appSettingsService.infoSidebarIsOpen.subscribe(data => this.sidebarIsOpen = data);
  }

  onToggleSidebar(isOpen: boolean) {
    this.appSettingsService.setInfoSidebarIsOpen(isOpen);
  }
}
