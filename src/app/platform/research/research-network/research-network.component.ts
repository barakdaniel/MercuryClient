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
  // displayedColumns: string[] = ['source', 'target'];
  data: Interaction[] = [
    {
      id: 1,
      source: "A",
      target: "B",
      score: 1,
      message: "hello",
      round: 1,
      time_stamp: "12:00:00",
      research: 1
    },
    {
      id: 1,
      source: "A",
      target: "B",
      score: 1,
      message: "hello",
      round: 1,
      time_stamp: "12:00:00",
      research: 1
    },
  ];

  filteredData: Interaction[];

  options = {
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

  constructor() { }

  ngOnInit(): void {
    this.filteredData = this.data;
  }

  exportCSV() {
    new AngularCsv(this.filteredData, 'Interactions', this.options);
  }

}
