import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  content = 'i\'m admin';

  constructor(private userService: UserService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    // this.userService.getAdminBoard().subscribe(
    //   data => {
    //     this.content = data.message;
    //   },
    //   error => {
    //     this.toastrService.error(error.error.error);
    //   }
    // );
  }
}
