import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequestPayload} from '../../model/payload/login-request-payload';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequestPayload: LoginRequestPayload;
  loginForm: FormGroup;
  isError: boolean;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      if (data) {
        this.storageService.storeToken(data.jwtToken);
        this.storageService.storeUsername(data.username);
        this.storageService.storeRoles(data.roles);
        this.isError = false;
        this.authService.isLoggedIn.next(true);
        this.authService.isAdmin.next(data.roles.includes('ROLE_ADMIN'));
        this.authService.isModerator.next(data.roles.includes('ROLE_MODERATOR'));
        this.authService.username.next(data.username);
        this.toastrService.success('Login Successful');
        this.router.navigate(['/user']);
      }
    }, error => {
      this.isError = true;
      this.toastrService.error(`Login failed: ${error.error.error}`);
    });
  }
}
