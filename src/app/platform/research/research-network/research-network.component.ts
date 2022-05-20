import { Component, Input, OnInit } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

import { Interaction } from 'src/app/core/interfaces/Interaction';
import { Research } from 'src/app/core/interfaces/Research';

@Component({
  selector: 'app-research-network',
  templateUrl: './research-network.component.html',
  styleUrls: ['./research-network.component.css']
})
export class ResearchNetworkComponent implements OnInit {

  @Input() research: Research;
  data: Interaction[];

  constructor() { }

  ngOnInit(): void {
    this.data = this.research.interactions;

  }

}
