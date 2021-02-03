import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges {

  @Input() data: number[];
  @Input() labels: string[];
  @Input() type: string;

  options = {
    legend: {
      position: null,
    }
  };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type.currentValue === 'pie') {
      this.options.legend.position = 'right';
    } else if (this.type === 'bar' || this.type === 'line') {
      this.options.legend.position = 'top';
    }
  }
}
