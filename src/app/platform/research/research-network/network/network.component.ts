import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data";
import { Interaction } from 'src/app/core/interfaces/Interaction';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { HttpService } from 'src/app/core/services/http.service';
import { HttpParams } from '@angular/common/http';
import { Research } from 'src/app/core/interfaces/Research';
//import * as cytoscape from "cytoscape";

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit, AfterViewInit {
  @Input() interactions: Interaction[];
  @Input() research: Research;

  nodes = new DataSet<any>();
  edges = new DataSet<any>();

  networkData;
  centrality: { name: string, value: number };
  filter;
  filteredInteractions: Interaction[];

  constructor(public spinnerService: SpinnerService, private httpService: HttpService) { }

  ngOnInit(): void {
    this.getNetworkData();
  }

  ngAfterViewInit() {
    this.filteredInteractions = this.interactions;
    this.initNetwork();
  }

  initNetwork() {
    this.initNodes();
    this.initEdges();
    this.createNetwork();
  }

  filterData() {
    this.spinnerService.show();

    if (this.filter == 0) {
      this.filteredInteractions = this.interactions;
    }
    else {
      this.filteredInteractions = [];
      this.filteredInteractions = this.interactions.filter(interaction => interaction.round == this.filter);
    }

    this.initNetwork();

    this.spinnerService.hide();
  }

  getNetworkData() {
    this.spinnerService.show();
    const params = new HttpParams()
      .set('centrality', 'true')
      .set('density', 'true')
      .set('diameter', 'true')
      .set('radius', 'true')
      .set('reciprocity', 'true');

    this.httpService.get(`research/${this.research.id}/network`, params).subscribe({
      next: (res) => {
        this.networkData = res;

        this.centrality = {
          name: Object.keys(this.networkData.centrality)[0],
          value: Object.values(this.networkData.centrality)[0] as number
        }
        this.spinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinnerService.hide();
      }
    })
  }

  initEdges() {
    this.edges.clear();
    let i = 0;
    this.filteredInteractions.map((interaction) => {
      this.edges.add([
        { id: i++, from: interaction.source, to: interaction.target, width: ((interaction.score + 1) * 2) },
      ]);
    });
  }

  initNodes() {
    this.nodes.clear();
    this.filteredInteractions.map((interaction) => {
      try {
        this.nodes.add([
          { id: interaction.source, label: interaction.source, group: 1 },
        ]);
        this.nodes.add([
          { id: interaction.target, label: interaction.target, group: 1 },
        ]);
      } catch { }
    });
  }

  createNetwork() {
    // create a network
    var container = document.getElementById("mynetwork");
    var data = {
      nodes: this.nodes,
      edges: this.edges,
    };
    var options = {
      nodes: {
        shape: "dot",
        size: 16,
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -26,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18,
        },
        maxVelocity: 146,
        solver: "forceAtlas2Based",
        timestep: 0.35,
        stabilization: { iterations: 150 },
      },
      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 1,
            type: "arrow"
          }
        }
      }
    };
    if (container)
      var network = new Network(container, data, options);
  }
}

