import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() datasets: ChartDataSets[];
  @Input() labels: string[];

  options: ChartOptions = {
    aspectRatio: 3,
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
        gridLines: {
          display: true
        },
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        type: 'time',
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10
        },
        gridLines: {
          display: false,
        }
      }]
    },
    elements: {
      line: {
        fill: false,
        tension: 0
      }
    }
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
