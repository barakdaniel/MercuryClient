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
  filteredData: Interaction[];

  options;

  constructor() { }

  ngOnInit(): void {

    this.data = this.research.interactions;
    this.filteredData = this.data;

    this.options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: 'Interactions',
      useBom: true,
      headers: Object.keys(this.data[0]),
      useHeader: false,
      nullToEmptyString: true,
    };
  }

  exportCSV() {
    new AngularCsv(this.filteredData, 'Interactions', this.options);
  }

}
