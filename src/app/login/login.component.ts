import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
import { SpinnerService } from '../core/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result: string;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
  });

  constructor(public authService: AuthService, private router: Router, public spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.authService.tryLoginWithToken();
  }

  async submit() {
    this.authService.login(this.form.value);
  }

}
