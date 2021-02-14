import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  activeHomepage = new BehaviorSubject<string>(null);
  activeNavTab = new BehaviorSubject<string>(null);
  navSidebarIsOpen = new BehaviorSubject<boolean>(null);
  infoSidebarIsOpen = new BehaviorSubject<boolean>(null);

  constructor(private storageService: StorageService) {
    const navSidebarIsOpen = storageService.retrieveNavSidebarIsOpen();
    const infoSidebarIsOpen = storageService.retrieveInfoSidebarIsOpen();

    if (navSidebarIsOpen) {
      this.navSidebarIsOpen.next(navSidebarIsOpen);
    }

    if (infoSidebarIsOpen) {
      this.infoSidebarIsOpen.next(infoSidebarIsOpen);
    }
  }

  clear() {
    this.navSidebarIsOpen.next(null);
    this.infoSidebarIsOpen.next(null);
  }

  setActiveHomepage(page: string) {
    this.activeHomepage.next(page);
  }

  setActiveNavTab(tab: string) {
    this.activeNavTab.next(tab);
  }

  setNavSidebarIsOpen(isOpen: boolean) {
    this.storageService.storeNavSidebarIsOpen(isOpen);
    this.navSidebarIsOpen.next(isOpen);
  }

  setInfoSidebarIsOpen(isOpen: boolean) {
    this.storageService.storeInfoSidebarIsOpen(isOpen);
    this.infoSidebarIsOpen.next(isOpen);
  }
}
