import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../../services/todo.service';
import {Todo} from '../../../model/todo';
import {AppSettingsService} from '../../../services/app-settings.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  loaded = false;

  constructor(private todoService: TodoService, private appSettingsService: AppSettingsService) {
  }

  ngOnInit(): void {
    this.appSettingsService.setActiveHomepage('list');

    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
      this.loaded = true;
    });
  }

}
