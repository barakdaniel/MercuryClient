import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Research } from 'src/app/core/interfaces/Research';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  research: Research;
  activeTab: string = "Details";
  id: string;

  constructor(private authService: AuthService, private spinnerService: SpinnerService, private httpService: HttpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getResearchData();
  }

  getResearchData() {
    this.spinnerService.show();
    this.httpService.get(`profiles/${this.authService.loggedUserData.id}/details`).subscribe({
      next: (res) => {

        res.researchs.map(research => {
          if (research.id == this.id) {
            this.research = JSON.parse(JSON.stringify(research)) as Research;
          }
        });
        this.spinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinnerService.hide();
      }
    });
  }
}
