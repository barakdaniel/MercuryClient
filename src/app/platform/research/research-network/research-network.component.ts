import { Component, Input, OnInit } from '@angular/core';
import { Research } from 'src/app/core/interfaces/Research';

@Component({
  selector: 'app-research-network',
  templateUrl: './research-network.component.html',
  styleUrls: ['./research-network.component.css']
})
export class ResearchNetworkComponent implements OnInit {

  @Input() research: Research;

  constructor() { }

  ngOnInit(): void {
  }

}
