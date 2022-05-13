import { Component, Input, OnInit } from '@angular/core';
import { Research } from 'src/app/core/interfaces/Research';

@Component({
  selector: 'app-research-participants-data',
  templateUrl: './research-participants-data.component.html',
  styleUrls: ['./research-participants-data.component.css']
})
export class ResearchParticipantsDataComponent implements OnInit {

  @Input() research: Research;

  constructor() { }

  ngOnInit(): void {
  }

}
