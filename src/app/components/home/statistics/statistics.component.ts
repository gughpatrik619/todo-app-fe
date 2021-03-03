import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../../services/todo.service';
import {Todo} from '../../../model/todo';
import {ChartDataSets} from 'chart.js';
import {EState} from '../../../model/e-state.enum';
import {EPriority} from '../../../model/e-priority.enum';

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

  burndownDataset: ChartDataSets;
  burndownLabels: string[];

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(data => {

      this.calculateTodoStates(data);
      this.calculateTodoPriorities(data);
      this.calculateBurndown(data);

      this.loaded = true;
    });
  }

  private calculateTodoStates(todos: Todo[]) {
    const todo = todos.filter(it => it.state === EState.TO_DO).length;
    const inProgress = todos.filter(it => it.state === EState.IN_PROGRESS).length;
    const done = todos.filter(it => it.state === EState.DONE).length;
    const deferred = todos.filter(it => it.state === EState.DEFERRED).length;

    this.stateDataset = {
      data: [todo, inProgress, done, deferred],
      backgroundColor: ['#0dcaf0', '#0d6efd', '#198754', '#6c757d'],
      hoverBackgroundColor: '#000000',
      hoverBorderWidth: 0
    };
    this.stateDataLabels = [EState.TO_DO, EState.IN_PROGRESS, EState.DONE, EState.DEFERRED];
  }

  private calculateTodoPriorities(todos: Todo[]) {
    const low = todos.filter(it => it.priority === EPriority.LOW).length;
    const medium = todos.filter(it => it.priority === EPriority.MEDIUM).length;
    const high = todos.filter(it => it.priority === EPriority.HIGH).length;

    this.priorityDataset = {
      data: [low, medium, high],
      backgroundColor: ['#198754', '#ffc107', '#dc3545'],
      hoverBackgroundColor: '#000000',
      hoverBorderWidth: 0
    };
    this.priorityDataLabels = [EPriority.LOW, EPriority.MEDIUM, EPriority.HIGH];
  }

  // todo
  private calculateBurndown(todos: Todo[]) {

    const todosDone = todos.filter(todo => todo.state === EState.DONE);

    console.log(`todos done: ${todosDone.length}`);


    const dateTimes: Date[] = [];
    for (let i = -30; i <= 0; ++i) {
      dateTimes.push(new Date(Date.now() + i * 24 * 3600 * 1000));
    }

    const datas = dateTimes.map(datetime => {

      console.log(`DATETIME: ${datetime.toDateString()}`);

      const todosDoneDue = todosDone.filter(todo => todo.lastUpdated < datetime);

      console.log(todosDoneDue);

      const num = todos.length - todosDoneDue.length;
      return num;
    });

    this.burndownDataset = {
      data: datas,
      backgroundColor: ['#0dcaf0', '#0d6efd', '#198754', '#6c757d'],
      hoverBackgroundColor: '#000000',
      hoverBorderWidth: 0
    };

    this.burndownLabels = dateTimes.map(date => date.toDateString());
  }

  private dummyTodos(): Todo[] {
    const now = Date.now();
    const day = 24 * 3600 * 1000;
    const creationDay = now - (30 * day);
    const todos: Todo[] = [];

    for (let i = 0; i < 100; ++i) {
      const todo = new Todo();

      todo.id = i;
      todo.created = new Date(creationDay);

      todo.title = `Title ${i}`;
      todo.description = `Desc ${i}`;
      todo.state = Object.values(EState).map((a) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)[0];
      todo.priority = Object.values(EPriority).map((a) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)[0];

      const r = creationDay + (20 * day) + (day * Math.floor(Math.random() * 40));
      todo.dueDate = new Date(r);
      todo.lastUpdated = new Date(Math.min(now, r - (day * Math.floor(Math.random() * 20))));

      todos.push(todo);
    }

    return todos;
  }
}
