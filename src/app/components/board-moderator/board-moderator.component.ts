import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent implements OnInit {

  content: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.userService.getModeratorBoard().subscribe(
      data => {
        this.content = data.message;
      },
      error => {
        console.log(error);
        this.toastrService.error(error.error.error);
        this.router.navigateByUrl('/login');
      }
    );
  }
}
