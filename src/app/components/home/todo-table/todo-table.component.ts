import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../../services/todo.service';
import {Todo} from '../../../model/todo';
import {AppSettingsService} from '../../../services/app-settings.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css']
})
export class TodoTableComponent implements OnInit {

  todos: Todo[] = [];
  todoToUpdate: Todo;
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

  onTodoCreated(newTodo: Todo) {
    this.todos.push(newTodo);
  }

  onUpdateTodo(updatedTodo: Todo) {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index > -1) {
      this.todos[index] = updatedTodo;
    }
  }

  deleteTodoById(id: number) {
    this.todoService.deleteTodoById(id).subscribe(
      next => {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index > -1) {
          this.todos.splice(index, 1);
        }
      },
      error => this.toastrService.error(error.error.message)
    );
  }
}
