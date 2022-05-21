import { Component, Input, OnInit } from '@angular/core';
import { Clue } from 'src/app/core/interfaces/Clue';
import { Research } from 'src/app/core/interfaces/Research';

@Component({
  selector: 'app-research-metadata',
  templateUrl: './research-metadata.component.html',
  styleUrls: ['./research-metadata.component.css']
})
export class ResearchMetadataComponent implements OnInit {

  @Input() research: Research;

  displayedCommonCluesColumns: string[] = ['round', 'message'];
  ELEMENT_DATA: Clue[] = [];
  dataSourceCommonClues;

  constructor() { }

  ngOnInit(): void {
    console.log(this.research);
    this.research.clue.forEach(clue => {
      this.ELEMENT_DATA.push(clue);
    });
    this.dataSourceCommonClues = this.ELEMENT_DATA;
  }

}
