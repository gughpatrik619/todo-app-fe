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

  sortByAttr: string = null;
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
    });
  }

  onTodoCreated(newTodo: Todo) {
    this.todos.push(newTodo);
  }

  deleteTodoById(id: number) {
    this.todoService.deleteTodoById(id).subscribe(
      () => {
        this.todos = this.todos.filter(todo => todo.id !== id);
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

  isToday(date: Date) {
    return new Date().toDateString() === new Date(date.toString()).toDateString();
  }

  editTodo(id: number) {
    this.router.navigate([{outlets: {info: ['edit', `${id}`]}}], {relativeTo: this.route.parent, skipLocationChange: true});
  }

  createTodo() {
    this.router.navigate([{outlets: {info: 'create'}}], {relativeTo: this.route.parent, skipLocationChange: true});
  }

  sortBy(attr: string) {
    this.sortByAttr = attr;
    this.sortAsc = !this.sortAsc;
  }
}
