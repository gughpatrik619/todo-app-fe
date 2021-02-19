import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../../../model/todo';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TodoService} from '../../../../services/todo.service';
import {EState} from '../../../../model/e-state.enum';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-todo-state-column',
  templateUrl: './todo-state-column.component.html',
  styleUrls: ['./todo-state-column.component.css']
})
export class TodoStateColumnComponent implements OnInit {

  @Input() data: Todo[];
  @Input() title: string;
  @Input() label: EState;

  open = true;

  constructor(private todoService: TodoService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
  }

  onDrop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      
      const todo = event.container.data[event.currentIndex];

      this.todoService.updateTodo(todo.id, {
        description: null,
        dueDate: null,
        priority: null,
        title: null,
        state: this.label
      }).subscribe(
        data => this.toastrService.success('Todo updated'),
        error => this.toastrService.error(error.error.message)
      );
    }
  }
}
