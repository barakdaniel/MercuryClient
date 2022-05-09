import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Research } from 'src/app/core/interfaces/Research';
import { AuthService } from 'src/app/core/services/auth.service';

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
  researches: Research[];
  researches_filtered: Research[];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    //this.firstname = this.authService.loggedUserData.first_name;
    this.firstname = 'Yossi';

    //this.researches = http get researches
    this.researches = [
      {
        research_name: 'AAAB',
        description: '',
        agent_bahavior: '1',
        start_time: 'yes',
      },
      {
        research_name: 'ABAB',
        description: '',
        agent_bahavior: '1',
        start_time: 'yes',
      },
      {
        research_name: 'BAAA',
        description: '',
        agent_bahavior: '1',
        start_time: 'yes',
      },
    ];
    this.researches_filtered = this.researches;
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
