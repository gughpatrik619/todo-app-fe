import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {StorageService} from '../../services/storage.service';
import {LoginRequestPayload} from '../../model/payload/login-request-payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  formError = false;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      loginPayload: this.formBuilder.group({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
      })
    });
  }

  get usernameFormControl() {
    return this.loginFormGroup.get('loginPayload.username');
  }

  get passwordFormControl() {
    return this.loginFormGroup.get('loginPayload.password');
  }

  onSubmit() {
    if (this.loginFormGroup.invalid) {
      this.toastrService.error('Invalid inputs');
      this.loginFormGroup.markAllAsTouched();
      this.formError = true;
      return;
    }

    const loginRequestPayload: LoginRequestPayload = this.loginFormGroup.controls.loginPayload.value;

    console.log(loginRequestPayload);

    this.authService.login(loginRequestPayload).subscribe(data => {
      if (data) {
        this.storageService.storeToken(data.jwtToken);
        this.storageService.storeUsername(data.username);
        this.storageService.storeRoles(data.roles);
        this.formError = false;
        this.authService.isLoggedIn.next(true);
        this.authService.isAdmin.next(data.roles.includes('ROLE_ADMIN'));
        this.authService.isModerator.next(data.roles.includes('ROLE_MODERATOR'));
        this.authService.username.next(data.username);
        this.toastrService.success('Login Successful');
        this.router.navigate(['/user']);
      }
    }, error => {
      console.log(error);
      this.toastrService.error(`Login failed: ${error.error.error}`);
    });
  }
}
