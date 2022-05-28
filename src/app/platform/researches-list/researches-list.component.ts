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

  firstname: string;
  search_filter: string = "";
  researches: any[] = [];
  researches_filtered: any[];

  constructor(private httpService: HttpService, private authService: AuthService, private router: Router, public spinnerService: SpinnerService) { }

  ngOnInit(): void {
    //this.firstname = this.authService.loggedUserData.first_name;
    this.firstname = this.authService.loggedUserData.first_name;
    this.getResearches();
  }

  getResearches() {
    this.spinnerService.show();
    this.httpService.get('profiles/' + this.authService.loggedUserData.id + '/details').subscribe({
      next: (res) => {
        this.researches = res.researches;
        // if (this.researches[0])
          // this.researches[0].game_configuration.start_time = new Date(this.researches[0].game_configuration.start_time);
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
    this.researches_filtered = [];
    this.researches.forEach(research => {
      if (research.research_name.startsWith(this.search_filter)) {
        this.researches_filtered.push(research);
      }
    })
  }

  createResearch() {
    this.router.navigate(['createresearch']);
  }
}
