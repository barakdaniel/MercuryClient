import { Component, Input, OnInit } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { Research } from 'src/app/core/interfaces/Research';

@Component({
  selector: 'app-research-csv',
  templateUrl: './research-csv.component.html',
  styleUrls: ['./research-csv.component.css']
})
export class ResearchCsvComponent implements OnInit {

  @Input() research: Research;

  constructor() { }

  ngOnInit(): void {
  }

  exportCSV(type: string) {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: type,
      useBom: true,
      headers: Object.keys(this.research[type.toLowerCase()][0]),
      useHeader: false,
      nullToEmptyString: true,
    };
    new AngularCsv(this.research[type.toLowerCase()], type, options);
  }

  exportHistoryCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: 'History',
      useBom: true,
      headers: Object.keys(this.research.interactions[0]),
      useHeader: false,
      nullToEmptyString: true,
    };
    const historyInteractions = [];
    this.research.interactions.forEach((interaction => {
      if (interaction.score == 2)
        historyInteractions.push(interaction);
    }));
    new AngularCsv(historyInteractions, 'History', options);
  }

}
