import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.css']
})
export class ChartCardComponent implements OnInit {

  @Input() title: string;
  @Input() datasets: ChartDataSets[];
  @Input() labels: string[];
  type = 'pie';

  constructor() {
  }

  ngOnInit(): void {
  }

}
