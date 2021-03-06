import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../../services/todo.service';
import {Todo} from '../../../model/todo';
import {AppSettingsService} from '../../../services/app-settings.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {EState} from '../../../model/e-state.enum';
import {EPriority} from '../../../model/e-priority.enum';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css']
})
export class TodoTableComponent implements OnInit {

  todos: Todo[] = [];
  loaded = false;
  query = '';

  sortField: string = null;
  sortAsc = true;

  stateFilterValues: EState[] = Object.values(EState);
  priorityFilterValues: EPriority[] = Object.values(EPriority);

  constructor(
    private todoService: TodoService,
    private appSettingsService: AppSettingsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
      this.toastrService.error('Cannot load data');
    });
  }

  deleteTodoById(id: number) {
    this.todoService.deleteTodoById(id).subscribe(
      () => {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index > -1) {
          this.todos.splice(index, 1);
        }
        this.toastrService.success(`Todo #${id} deleted.`);
      },
      error => this.toastrService.error(error.error.message)
    );
  }

  onStateCheckboxChanged(e, state: string) {
    if (e.target.checked) {
      this.stateFilterValues = this.stateFilterValues.concat(state as EState);
    } else {
      this.stateFilterValues = this.stateFilterValues.filter(s => s !== state);
    }
  }

  onPriorityCheckboxChanged(e, priority: string) {
    if (e.target.checked) {
      this.priorityFilterValues = this.priorityFilterValues.concat(priority as EPriority);
    } else {
      this.priorityFilterValues = this.priorityFilterValues.filter(s => s !== priority);
    }
  }

  toUTCString(date: Date) {
    return new Date(date.toString()).toUTCString();
  }

  dueToday(date: Date) {
    const today = new Date();
    const due = new Date(date.toString());

    return today.toDateString() === due.toDateString();
  }

  expired(date: Date) {
    const today = new Date();
    const due = new Date(date.toString());

    return today.toISOString() > due.toISOString();
  }

  editTodo(id: number) {
    this.router.navigate([{outlets: {info: ['edit', `${id}`]}}], {relativeTo: this.route.parent, skipLocationChange: true});
  }

  createTodo() {
    this.router.navigate([{outlets: {info: 'create'}}], {relativeTo: this.route.parent, skipLocationChange: true});
  }

  sortByField(field: string, ascending = true) {
    this.sortField = field;
    this.sortAsc = ascending;
  }

  toUTCStr(date: Date) {

    return new Date(date).toLocaleString('sk-SK');
  }
}
