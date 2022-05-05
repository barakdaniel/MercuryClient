import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
  });

  constructor() { }

  ngOnInit(): void {

  }

  submit() {
    console.log(this.form.value);
  }

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
}
