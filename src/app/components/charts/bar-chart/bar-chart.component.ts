import {Component, Input, OnInit} from '@angular/core';
import {ChartOptions} from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @Input() data: number[];
  @Input() labels: string[];

  options: ChartOptions = {
    aspectRatio: 1,
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      display: false,
      position: 'top',
      align: 'center',
      labels: {
        usePointStyle: true
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
