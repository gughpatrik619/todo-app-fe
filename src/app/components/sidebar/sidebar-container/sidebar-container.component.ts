import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar-container',
  templateUrl: './sidebar-container.component.html',
  styleUrls: ['./sidebar-container.component.css']
})
export class SidebarContainerComponent implements OnInit {

  @Input() isOpen: boolean;
  @Output() toggleEvent = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.toggleEvent.emit(this.isOpen);
  }
}
