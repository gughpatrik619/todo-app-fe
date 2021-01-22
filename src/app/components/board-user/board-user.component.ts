import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  content = 'I\'m user';

  constructor() {
  }

  ngOnInit(): void {
  }
}
