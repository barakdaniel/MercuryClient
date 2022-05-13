import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Research } from 'src/app/core/interfaces/Research';
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

  constructor(private spinnerService: SpinnerService, private httpService: HttpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    //getResearchData();
    this.initResearchesForDebug();
  }

  getResearchData() {
    this.spinnerService.show();
    this.httpService.get(`research/${this.id}`).subscribe({
      next: (res) => {
        this.research = res;
        this.spinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinnerService.hide();
      }
    });
  }

  //Until we have http request:
  initResearchesForDebug() {
    this.research = {
      research_name: "Test",
      research_description: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ',
      interactions: [],
      game_configuration: {
        agent_bahavior: "Optimal",
        start_time: new Date()
      },
      participants: [
        {
          email: "test@mercury.com",
          character_name: "ABC",
          daily_mission_score: 123,
          was_killer: true,
          killer_round: 1,
          game_appearance: {
            hair: "Blue",
            gender: "Male",
            items: "Axe",
            color: "White"
          }
        },
        {
          email: "test@mercury.com",
          character_name: "ABC",
          daily_mission_score: 123,
          was_killer: true,
          killer_round: 1,
          game_appearance: {
            hair: "Blue",
            gender: "Male",
            items: "Axe",
            color: "White"
          }
        }
      ]
    }
  }
}
