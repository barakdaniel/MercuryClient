import { Component, Input, OnInit } from '@angular/core';
import { Research } from 'src/app/core/interfaces/Research';

@Component({
  selector: 'app-research-metadata',
  templateUrl: './research-metadata.component.html',
  styleUrls: ['./research-metadata.component.css']
})
export class ResearchMetadataComponent implements OnInit {

  @Input() research: Research;

  constructor() { }

  ngOnInit(): void {
  }

}
