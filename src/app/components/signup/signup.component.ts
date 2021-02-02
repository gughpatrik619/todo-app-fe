import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SignupRequestPayload} from '../../model/payload/signup-request-payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupFormGroup: FormGroup;
  formError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.signupFormGroup = this.formBuilder.group({
      signupPayload: this.formBuilder.group({
        username: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      })
    });
  }

  get usernameFormControl() {
    return this.signupFormGroup.get('signupPayload.username');
  }

  get passwordFormControl() {
    return this.signupFormGroup.get('signupPayload.password');
  }

  get emailFormControl() {
    return this.signupFormGroup.get('signupPayload.email');
  }

  onSubmit() {
    if (this.signupFormGroup.invalid) {
      this.toastrService.error('Invalid inputs');
      this.usernameFormControl.markAsDirty();
      this.passwordFormControl.markAsDirty();
      this.emailFormControl.markAsDirty();

      this.formError = true;
      return;
    }

    const signupRequestPayload: SignupRequestPayload = this.signupFormGroup.controls.signupPayload.value;

    console.log(signupRequestPayload);

    this.authService.signup(signupRequestPayload).subscribe(() => {
      this.toastrService.success('Sign up successful. Check your mail box for verification email.');
      this.router.navigate(['/login']);
    }, error => {
      this.toastrService.error(`Sign up failed: ${error.error.message}`);
    });
  }
}
