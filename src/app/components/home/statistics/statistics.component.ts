import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../../services/todo.service';
import {AppSettingsService} from '../../../services/app-settings.service';
import {Todo} from '../../../model/todo';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  loaded = false;
  dataTodoStates: number[] = [];
  labelsTodoStates: string[] = [];

  dataTodoPriorities: number[] = [];
  labelsTodoPriorities: string[] = [];

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
    const states = [];
    const counts = {};

    for (const todo of todos) {
      states.push(todo.state);
    }

    for (const state of states) {
      counts[state] = counts[state] ? counts[state] + 1 : 1;
    }

    this.dataTodoStates = Object.values(counts);
    this.labelsTodoStates = Object.keys(counts);
  }

  private calculateTodoPriorities(todos: Todo[]) {
    const priorities = [];
    const counts = {};

    for (const todo of todos) {
      priorities.push(todo.priority);
    }

    for (const priority of priorities) {
      counts[priority] = counts[priority] ? counts[priority] + 1 : 1;
    }

    this.dataTodoPriorities = Object.values(counts);
    this.labelsTodoPriorities = Object.keys(counts);
  }
}
