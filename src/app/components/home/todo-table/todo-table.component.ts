import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../../services/todo.service';
import {Todo} from '../../../model/todo';
import {AppSettingsService} from '../../../services/app-settings.service';
import {Router} from '@angular/router';
import {CreateTodo} from '../../../model/create-todo';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css']
})
export class TodoTableComponent implements OnInit {

  todos: Todo[] = [];
  loaded = false;

  constructor(
    private todoService: TodoService,
    private appSettingsService: AppSettingsService,
    private router: Router,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.appSettingsService.setActiveHomepage('table');

    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
      this.loaded = true;
    });
  }

  createTodo() {
    const newTodo = new CreateTodo();
    newTodo.title = 'New title 2';
    newTodo.description = 'New desc 2';
    newTodo.priority = 'LOW';
    newTodo.dueDate = new Date();

    this.todoService.saveTodo(newTodo).subscribe(data => {
        this.todos.push(data);
        this.toastrService.success('New Todo created');
      },
      error => this.toastrService.error('Error occurred')
    );
  }
}
