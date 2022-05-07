import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  formInvalid: boolean = false;

  checkpassword: ValidatorFn = (formGroup: FormGroup) => {
    const pass = formGroup.get('password').value;
    const confirmPass = formGroup.get('confirmpassword').value
    return pass === confirmPass ? null : { notSame: true }
  }

  form = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
    confirmpassword: new FormControl('', [Validators.required,Validators.minLength(4), Validators.maxLength(12)]),

  },{validators: this.checkpassword});

  constructor(private fb: FormBuilder, private  authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  submit(){

    if (this.form.invalid){
      this.formInvalid = true;
      return;
    }
    this.authService.register(this.form.value); 
    
    const user = {
      email: this.form.get('email').value,
      password: this.form.get('password').value

    }       
    this.authService.login(user);
    this.router.navigate(['']);
  }




}