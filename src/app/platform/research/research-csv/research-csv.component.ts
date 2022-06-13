import { Component, Input, OnInit } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { Interaction } from 'src/app/core/interfaces/Interaction';
import { Participant } from 'src/app/core/interfaces/Participant';
import { Research } from 'src/app/core/interfaces/Research';
import { HttpService } from 'src/app/core/services/http.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-research-csv',
  templateUrl: './research-csv.component.html',
  styleUrls: ['./research-csv.component.css']
})
export class ResearchCsvComponent implements OnInit {

  @Input() research: Research;
  interactions: Interaction[];
  participants = [];

  constructor(public spinnerService: SpinnerService, private httpService: HttpService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.getNetworkData();
    this.initParticipants();
  }

  initParticipants() {
    this.research.participants.forEach((participant: Participant) => {
      try {
        this.participants.push({
          id: participant.id,
          email: participant.email,
          character_name: participant.character_name,
          was_killer: participant.was_killer,
          killer_round: participant.killer_round,
          hair_color: participant.game_appearance.hair,
          gender: participant.game_appearance.gender,
          skin_color: participant.game_appearance.color,
          item: participant.game_appearance.items,
          clue_1_round: participant.clue[0]?.round,
          clue_1_message: participant.clue[0]?.message,
          clue_2_round: participant.clue[1]?.round,
          clue_2_message: participant.clue[1]?.message,
          clue_3_round: participant.clue[2]?.round,
          clue_3_meesage: participant.clue[2]?.message,
        })
      } catch { }
    });
  }

  getNetworkData() {
    this.spinnerService.show();
    this.httpService.get(`research/${this.research.id}/details/interactions/`).subscribe({
      next: (res) => {
        this.interactions = res;
        this.spinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinnerService.hide();
      }
    })
  }

  generateKeys(obj: any) {
    let keys = [];

    Object.keys(obj).forEach(key => {
      const _value = obj[key];
      if (_value) {
        if (typeof (_value) == "object")
          keys = keys.concat(this.generateKeys(_value));
      }
      else
        keys.push(key);
    });

    return keys;
  }

  exportInteractionsCSV(type: string) {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: type,
      useBom: true,
      headers: Object.keys(this.interactions[0]),
      useHeader: false,
      nullToEmptyString: false,
    };
    new AngularCsv(this.interactions, type, options);
  }

  exportParticipantsCSV(type: string) {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: type,
      useBom: true,
      headers: Object.keys(this.participants[0]),
      useHeader: false,
      nullToEmptyString: true,
    };
    new AngularCsv(this.participants, type, options);
  }
}
