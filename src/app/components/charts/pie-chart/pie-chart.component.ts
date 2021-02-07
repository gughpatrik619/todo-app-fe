import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() datasets: ChartDataSets[];
  @Input() labels: string[];

  options: ChartOptions = {
    aspectRatio: 3 / 2,
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      display: true,
      position: 'right',
      align: 'center',
      labels: {
        usePointStyle: true
      }
    }
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
