import {Component, OnInit} from '@angular/core';
import {Todo} from '../../../model/todo';
import {TodoService} from '../../../services/todo.service';
import {EState} from '../../../model/e-state.enum';

@Component({
  selector: 'app-todo-board',
  templateUrl: './todo-board.component.html',
  styleUrls: ['./todo-board.component.css']
})
export class TodoBoardComponent implements OnInit {

  todosDone: Todo[] = [];
  todosInProgress: Todo[] = [];
  todosDeferred: Todo[] = [];
  todosToDo: Todo[] = [];

  loaded = false;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe(data => {
      const todos = data;
      this.todosDone = todos.filter(todo => todo.state === EState.DONE);
      this.todosInProgress = todos.filter(todo => todo.state === EState.IN_PROGRESS);
      this.todosDeferred = todos.filter(todo => todo.state === EState.DEFERRED);
      this.todosToDo = todos.filter(todo => todo.state === EState.TO_DO);
      this.loaded = true;
    });
  }
}
