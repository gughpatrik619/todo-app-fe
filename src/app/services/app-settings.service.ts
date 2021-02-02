import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  activeHomepage = new BehaviorSubject<string>(null);
  leftSidebarState = new BehaviorSubject<string>(null);

  constructor(private storageService: StorageService) {
    const leftSidebarState = storageService.retrieveLeftSidebarState();

    if (leftSidebarState) {
      this.leftSidebarState.next(leftSidebarState);
    }
  }

  clear() {
    this.leftSidebarState.next(null);
  }

  setActiveHomepage(page) {
    this.activeHomepage.next(page);
  }

  setLeftSidebarState(state: string) {
    this.storageService.storeLeftSidebarState(state);
    this.leftSidebarState.next(state);
  }
}
