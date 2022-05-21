import { Component, Input, OnInit } from '@angular/core';

import { Research } from 'src/app/core/interfaces/Research';
import { Participant } from 'src/app/core/interfaces/Participant';

@Component({
  selector: 'app-research-participants-data',
  templateUrl: './research-participants-data.component.html',
  styleUrls: ['./research-participants-data.component.css']
})
export class ResearchParticipantsDataComponent implements OnInit {

  @Input() research: Research;

  displayedColumns: string[] = ['email', 'character_name', 'killer', 'game_appearance.hair', 'game_appearance.gender', 'game_appearance.color', 'game_appearance.items', 'clue'];
  ELEMENT_DATA: Participant[] = [];
  dataSource;

  constructor() { }

  ngOnInit(): void {
    //this.dataSource = this.research.participants;
    this.research.participants.forEach(participant => {
      this.ELEMENT_DATA.push(participant);
    });
    this.dataSource = this.ELEMENT_DATA;
  }

}
