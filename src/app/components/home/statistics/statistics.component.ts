import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../../services/todo.service';
import {AppSettingsService} from '../../../services/app-settings.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  loaded = false;
  data: number[] = [];
  labels: string[] = [];

  constructor(private todoService: TodoService, private appSettingsService: AppSettingsService) {
  }

  ngOnInit(): void {
    this.appSettingsService.setActiveHomepage('stats');

    this.todoService.getTodos().subscribe(data => {

      const states = [];
      const counts = {};

      for (const todo of data) {
        states.push(todo.state);
      }

      for (const state of states) {
        counts[state] = counts[state] ? counts[state] + 1 : 1;
      }

      this.data = Object.values(counts);
      this.labels = Object.keys(counts);

      this.loaded = true;
    });
  }

}
