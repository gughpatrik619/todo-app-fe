import {Component, OnInit} from '@angular/core';
import {AppSettingsService} from '../../services/app-settings.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  activeHomepage: string;
  leftSidebarState: string;

  constructor(private appSettingservice: AppSettingsService) {
  }

  ngOnInit(): void {
    this.appSettingservice.activeHomepage.subscribe(page => this.activeHomepage = page);
    this.appSettingservice.leftSidebarState.subscribe(state => this.leftSidebarState = state);
  }

  openPage(page: string) {
    this.appSettingservice.setActiveHomepage(page);
  }
}
