import { Component, Input, OnInit } from '@angular/core';
import { Research } from 'src/app/core/interfaces/Research';

@Component({
  selector: 'app-research-details',
  templateUrl: './research-details.component.html',
  styleUrls: ['./research-details.component.css']
})
export class ResearchDetailsComponent implements OnInit {

  @Input() research: Research;

  constructor() { }

  ngOnInit(): void {
  }

}
