import {Component, OnInit} from '@angular/core';
import {Todo} from '../../model/todo';
import {TodoService} from '../../services/todo.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todosDone: Todo[] = [];
  todosInProgress: Todo[] = [];
  todosDeferred: Todo[] = [];
  todosToDo: Todo[] = [];
  loaded = false;

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(data => {
      const todos = data;
      this.todosDone = todos.filter(todo => todo.state === 'DONE');
      this.todosInProgress = todos.filter(todo => todo.state === 'IN_PROGRESS');
      this.todosDeferred = todos.filter(todo => todo.state === 'DEFERRED');
      this.todosToDo = todos.filter(todo => todo.state === 'TO_DO');
      this.loaded = true;
    });
  }

  onDrop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.container.data[event.currentIndex]);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
