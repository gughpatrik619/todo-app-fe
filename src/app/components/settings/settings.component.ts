import {Component, OnInit} from '@angular/core';
import {AppSettingsService} from '../../services/app-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private appSettingsService: AppSettingsService) {
  }

  ngOnInit(): void {
    this.appSettingsService.setActiveNavTab('settings');
  }

}
