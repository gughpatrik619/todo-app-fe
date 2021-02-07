import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../../services/todo.service';
import {AppSettingsService} from '../../../services/app-settings.service';
import {Todo} from '../../../model/todo';
import {ChartDataSets} from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  loaded = false;
  stateDataset: ChartDataSets;
  stateDataLabels: string[] = [];

  priorityDataset: ChartDataSets;
  priorityDataLabels: string[] = [];

  constructor(private todoService: TodoService, private appSettingsService: AppSettingsService) {
  }

  ngOnInit(): void {
    this.appSettingsService.setActiveHomepage('stats');

    this.todoService.getTodos().subscribe(data => {

      this.calculateTodoStates(data);
      this.calculateTodoPriorities(data);

      this.loaded = true;
    });
  }

  private calculateTodoStates(todos: Todo[]) {
    const todo = todos.filter(it => it.state === 'TO DO').length;
    const inProgress = todos.filter(it => it.state === 'IN PROGRESS').length;
    const done = todos.filter(it => it.state === 'DONE').length;
    const deferred = todos.filter(it => it.state === 'DEFERRED').length;

    this.stateDataset = {
      data: [todo, inProgress, done, deferred],
      backgroundColor: ['#0dcaf0', '#0d6efd', '#198754', '#6c757d']
    };
    this.stateDataLabels = ['TO DO', 'IN PROGRESS', 'DONE', 'DEFERRED'];
  }

  private calculateTodoPriorities(todos: Todo[]) {
    const low = todos.filter(it => it.priority === 'LOW').length;
    const medium = todos.filter(it => it.priority === 'MEDIUM').length;
    const high = todos.filter(it => it.priority === 'HIGH').length;

    this.priorityDataset = {
      data: [low, medium, high],
      backgroundColor: ['#198754', '#ffc107', '#dc3545']
    };
    this.priorityDataLabels = ['LOW', 'MEDIUM', 'HIGH'];
  }
}
