import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.css']
})
export class ChartCardComponent implements OnInit {

  @Input() title: string;
  @Input() data: number[];
  @Input() labels: string[];
  type = 'pie';

  constructor() {
  }

  ngOnInit(): void {
  }

}
