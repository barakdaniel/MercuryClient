import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data";
import { Interaction } from 'src/app/core/interfaces/Interaction';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { HttpService } from 'src/app/core/services/http.service';
import { HttpParams } from '@angular/common/http';
import { Research } from 'src/app/core/interfaces/Research';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  // interactions: Interaction[];
  @Input() research: Research;

  nodes = new DataSet<any>();
  edges = new DataSet<any>();
  nodesFromBE: any[];
  edgesFromBE: any[];

  filters = {
    round: 0,
    player: 0,
    knowledge: -1,
    duplicates: true
  }

  networkData;
  centrality: { name: string, value: number };
  filteredInteractions: Interaction[];
  options;

  constructor(public spinnerService: SpinnerService, private httpService: HttpService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.getNetworkData();
  }

  initNetwork() {
    this.initNodes();
    this.initEdges();
    this.createNetwork();
  }

  filterData() {
    this.spinnerService.show();
    this.getNetworkData();
  }

  getNetworkData(round?) {
    this.spinnerService.show();
    let params = new HttpParams()
      .set('centrality', 'true')
      .set('density', 'true')
      .set('diameter', 'true')
      .set('radius', 'true')
      .set('reciprocity', 'true');

    Object.keys(this.filters).forEach(key => {
      if (this.filters[key])
        params = params.append(key, this.filters[key]);
    })

    this.httpService.get(`research/${this.research.id}/network`, params).subscribe({
      next: (res) => {
        this.networkData = res;

        if (this.networkData.centrality) {
          this.centrality = {
            name: Object.keys(this.networkData.centrality)[0],
            value: Object.values(this.networkData.centrality)[0] as number
          }
        }
        else {
          this.centrality = null;
        };
        this.nodesFromBE = this.networkData.graph.nodes;
        this.edgesFromBE = this.networkData.graph.edges;
        this.initNetwork();
        this.spinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinnerService.hide();
      }
    })
  }

  filterEdges() {
    let tempEdges = this.edgesFromBE;

    if (this.filters.player) {
      const player = this.filters.player;
      tempEdges = tempEdges.filter(edge => {
        return edge[0] == player || edge[1] == player;
      });
    }

    if (this.filters.knowledge != -1) {
      const knowledge = this.filters.knowledge;
      tempEdges = tempEdges.filter(edge => {
        return edge[2].weight == knowledge;
      });
    }

    if (!this.filters.duplicates) {
      tempEdges = tempEdges.filter((value, index) => {
        const _value = JSON.stringify({ source: value[0], target: value[1] });
        const _value2 = JSON.stringify({ source: value[1], target: value[0] });
        return index === tempEdges.findIndex(obj => {
          return JSON.stringify({ source: obj[0], target: obj[1] }) === _value
            || JSON.stringify({ source: obj[0], target: obj[1] }) === _value2;
        });
      });

      tempEdges = tempEdges.map(edge => {
        edge[2].weight = -1;
        return edge;
      });
    }

    return tempEdges;
  }

  initEdges() {
    this.edges.clear();
    const tempEdges = this.filterEdges();

    let i = 0;
    tempEdges.forEach(edge => {
      let edgeColor;
      if (edge[2].weight == 0)
        edgeColor = '#FF0000';
      else if (edge[2].weight == 1)
        edgeColor = '#00FF00';
      else if (edge[2].weight == 2)
        edgeColor = '#0000FF';
      else edgeColor = '#000000';

      this.edges.add([{ id: i++, from: edge[0], to: edge[1], width: ((edge[2] + 1)), color: { color: edgeColor } }]);
    });
  }

  initNodes() {
    this.nodes.clear();
    this.nodesFromBE.forEach(node => {
      this.nodes.add([
        { id: node, label: node, group: 1 },
      ]);
    });
  }

  createNetwork() {
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
        stabilization: {
          enabled: true,
          iterations: 5,
          updateInterval: 25
        },
      },
      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 1,
            type: "arrow"
          }
        },
        color: {
          inherit: false,
          opacity: 1.0
        }
      }
    };
    if (container) {
      var network = new Network(container, data, options);
      network.on("stabilizationIterationsDone", function () {
        network.setOptions({ physics: false });
      });
    }
  }
}

