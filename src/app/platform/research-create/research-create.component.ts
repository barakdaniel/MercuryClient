import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-research-create',
  templateUrl: './research-create.component.html',
  styleUrls: ['./research-create.component.css']
})
export class ResearchCreateComponent implements OnInit {

  formInvalid = false;

  form = new FormGroup({
    research_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(24)]),
    description: new FormControl('', [Validators.maxLength(150)]),
    agent_bahavior: new FormControl('', [Validators.required]),
    start_time: new FormControl('', [Validators.required]),
  });

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.invalid) {
      this.formInvalid = true;
      return;
    }
    this.httpService.post('', this.form.value).subscribe({
      next: (res) => {
        this.router.navigate(['']);
      },
      error: (err) => {
        console.log(err)
      }
    });
    console.log(this.form.value);
  }

}
