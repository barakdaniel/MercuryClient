import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Research } from 'src/app/core/interfaces/Research';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-researches-list',
  templateUrl: './researches-list.component.html',
  styleUrls: ['./researches-list.component.css']
})
export class ResearchesListComponent implements OnInit {

  /* spinner */
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = false;
  spinnerWithoutBackdrop = false;

  // Display progress spinner for 3 secs on click of button
  showProgressSpinner = () => {
    this.displayProgressSpinner = true;
    setTimeout(() => {
      this.displayProgressSpinner = false;
    }, 3000);
  };
  /* end-spinner */

  firstname: string;
  search_filter: string = "";
  researches: Research[] = [];
  researches_filtered: Research[];

  constructor(private httpService: HttpService, private authService: AuthService, private router: Router, private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    //this.firstname = this.authService.loggedUserData.first_name;
    this.firstname = 'Yossi';
    this.getResearches()
  }

  getResearches() {
    this.spinnerService.show();
    this.httpService.get('research/').subscribe({
      next: (res) => {
        this.researches = res.data;
        this.researches[0].game_configuration.start_time = new Date(this.researches[0].game_configuration.start_time);
        this.researches_filtered = this.researches;
        this.spinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinnerService.hide();
      }
    })
  } 

  onSearchChange(event) {
    console.log(this.search_filter);

    this.researches_filtered = [];
    this.researches.forEach(research => {
      if (research.research_name.startsWith(this.search_filter)) {
        this.researches_filtered.push(research);
      }
    })

    console.log(this.researches_filtered);
  }

  createResearch() {
    this.router.navigate(['createresearch']);
  }
}
