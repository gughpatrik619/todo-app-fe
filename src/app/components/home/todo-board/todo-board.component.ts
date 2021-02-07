import {Component, OnInit} from '@angular/core';
import {Todo} from '../../../model/todo';
import {TodoService} from '../../../services/todo.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {AppSettingsService} from '../../../services/app-settings.service';
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

  todoToUpdate: Todo;

  loaded = false;

  constructor(private todoService: TodoService, private appSettingsService: AppSettingsService) {
  }

  ngOnInit() {
    this.appSettingsService.setActiveHomepage('board');

    this.todoService.getTodos().subscribe(data => {
      const todos = data;
      this.todosDone = todos.filter(todo => todo.state === EState.DONE);
      this.todosInProgress = todos.filter(todo => todo.state === EState.IN_PROGRESS);
      this.todosDeferred = todos.filter(todo => todo.state === EState.DEFERRED);
      this.todosToDo = todos.filter(todo => todo.state === EState.TODO);
      this.loaded = true;
    });
  }

  onUpdateTodo(updatedTodo: Todo) {
    console.log(updatedTodo);
  }

  onDrop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
