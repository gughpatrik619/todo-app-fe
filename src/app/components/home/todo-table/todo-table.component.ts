import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../../services/todo.service';
import {Todo} from '../../../model/todo';
import {AppSettingsService} from '../../../services/app-settings.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit {

  todos: Todo[] = [];
  todoToUpdate: Todo;
  loaded = false;

  sortByIdAsc = true;
  sortByDueDateAsc = true;
  sortByCreatedAsc = true;
  sortByLastUpdatedAsc = true;

  constructor(
    private todoService: TodoService,
    private appSettingsService: AppSettingsService,
    private router: Router,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
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
          this.toastrService.success('Todo deleted');
        }
      },
      error => this.toastrService.error(error.error.message)
    );
  }

  sortTodosById() {
    this.sortByIdAsc = !this.sortByIdAsc;

    if (this.sortByIdAsc) {
      this.todos.sort((a, b) => a.id > b.id ? 1 : -1);
    } else {
      this.todos.sort((a, b) => a.id < b.id ? 1 : -1);
    }
  }

  sortTodosByDueDate() {
    this.sortByDueDateAsc = !this.sortByDueDateAsc;

    if (this.sortByDueDateAsc) {
      this.todos.sort((a, b) => a.dueDate > b.dueDate ? 1 : -1);
    } else {
      this.todos.sort((a, b) => a.dueDate < b.dueDate ? 1 : -1);
    }
  }

  sortTodosByCreated() {
    this.sortByCreatedAsc = !this.sortByCreatedAsc;

    if (this.sortByCreatedAsc) {
      this.todos.sort((a, b) => a.created > b.created ? 1 : -1);
    } else {
      this.todos.sort((a, b) => a.created < b.created ? 1 : -1);
    }
  }

  sortTodosByLastUpdated() {
    this.sortByLastUpdatedAsc = !this.sortByLastUpdatedAsc;

    if (this.sortByLastUpdatedAsc) {
      this.todos.sort((a, b) => a.lastUpdated > b.lastUpdated ? 1 : -1);
    } else {
      this.todos.sort((a, b) => a.lastUpdated < b.lastUpdated ? 1 : -1);
    }
  }

  // todo: finish
  onStateCheckboxChanged(e, state: string) {
    if (!e.target.checked) {
      console.log('state: ' + state);
      this.todos = this.todos.filter(todo => todo.state !== state);
    }
  }

  isToday(date: Date) {
    return new Date().toDateString() === new Date(date.toString()).toDateString();
  }

  editTodo(id: number) {
    this.appSettingsService.setInfoSidebarIsOpen(true);
    this.router.navigateByUrl(`/home/(table//info:edit/${id})`);
  }

  createTodo() {
    this.appSettingsService.setInfoSidebarIsOpen(true);
    this.router.navigateByUrl('/home/(table//info:create)');
  }
}
