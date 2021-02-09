import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../../../model/todo';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-state-column',
  templateUrl: './todo-state-column.component.html',
  styleUrls: ['./todo-state-column.component.css']
})
export class TodoStateColumnComponent implements OnInit {

  @Input() data: Todo[];
  @Input() title: string;

  open = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  onDrop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
