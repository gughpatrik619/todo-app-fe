import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppSettingsService} from '../../../services/app-settings.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit, OnDestroy {

  constructor(private appSettingsService: AppSettingsService) {
  }

  ngOnInit(): void {
    this.appSettingsService.setInfoSidebarIsOpen(true);
  }

  ngOnDestroy(): void {
    this.appSettingsService.setInfoSidebarIsOpen(false);
  }

}
