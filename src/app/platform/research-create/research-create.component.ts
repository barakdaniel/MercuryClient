import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-research-create',
  templateUrl: './research-create.component.html',
  styleUrls: ['./research-create.component.css']
})
export class ResearchCreateComponent implements OnInit {

  formInvalid = false;
  // loading$ = this.spinnerService.loading$;

  form = new FormGroup({
    research_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(24)]),
    description: new FormControl('', [Validators.maxLength(150)]),
    agent_bahavior: new FormControl('', [Validators.required]),
    start_time: new FormControl('', [Validators.required]),
  });

  constructor(private httpService: HttpService, private router: Router, public spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.invalid) {
      this.formInvalid = true;
      return;
    }
    this.spinnerService.show();
    this.httpService.post('', this.form.value).subscribe({
      next: (res) => {
        this.router.navigate(['']);
        this.spinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.formInvalid = true;
        this.spinnerService.hide();
      }
    });
    console.log(this.form.value);
  }

}
