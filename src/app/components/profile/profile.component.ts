import {Component, OnInit} from '@angular/core';
import {AppSettingsService} from '../../services/app-settings.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private appSettingsService: AppSettingsService) {
  }

  ngOnInit(): void {
    this.appSettingsService.setActiveNavTab('profile');
  }

}
