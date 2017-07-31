import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  submitted: boolean = false;
  constructor(public router: Router, fb: FormBuilder, public authService: AuthService) {
    if (localStorage.getItem('user')) {
      this.router.navigate(['']);
    }
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      this.authService.signin(values);
    }
  }
  login() {
     this.authService.login();
  }

  logout() {
     this.authService.logout();
  }

}
