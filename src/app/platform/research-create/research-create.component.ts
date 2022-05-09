import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-research-create',
  templateUrl: './research-create.component.html',
  styleUrls: ['./research-create.component.css']
})
export class ResearchCreateComponent implements OnInit {

  progress = '50%'
  formStep: number = 1;
  formInvalid = false;
  participantsFormInvalid = false;

  form = new FormGroup({
    research_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(24)]),
    description: new FormControl('', [Validators.maxLength(150)]),
    agent_bahavior: new FormControl('', [Validators.required]),
    start_time: new FormControl('', [Validators.required]),
  });

  participantsForm = new FormGroup({
    participants: new FormArray([])
  })

  constructor(private httpService: HttpService, private router: Router, public spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }

  formNext() {
    if (this.form.invalid) {
      this.formInvalid = true;
      return;
    }

    this.progress = '100%';
    this.formInvalid = false;
    this.formStep++;
  }
  formBack() {
    this.progress = '50%';
    this.formStep--;
  }

  submit() {
    if (this.participantsForm.invalid || this.participantsControls.length < 5 || this.participantsControls.length > 10) {
      this.participantsForm.markAllAsTouched();
      this.participantsFormInvalid = true;
      return;
    }
    const newResearchData = this.form.value;
    newResearchData['participants'] = [];
    this.participantsControls.map(control => {
      newResearchData['participants'].push(control.value.email);
    })
    this.spinnerService.show();
    this.httpService.post('', newResearchData).subscribe({
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
  }

  onAddParticipant() {
    (<FormArray>this.participantsForm.get('participants')).push(new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    }));
  }
  onRemoveParticipant(index: number) {
    (<FormArray>this.participantsForm.get('participants')).removeAt(index);
  }

  get participantsControls() {
    return (<FormArray>this.participantsForm.get('participants')).controls;
  }
}
