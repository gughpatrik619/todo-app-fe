import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../../../model/todo';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TodoService} from '../../../../services/todo.service';
import {EState} from '../../../../model/e-state.enum';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-todo-state-column',
  templateUrl: './todo-state-column.component.html',
  styleUrls: ['./todo-state-column.component.css']
})
export class TodoStateColumnComponent implements OnInit {

  @Input() todos: Todo[];
  @Input() title: string;
  @Input() label: string;

  open = true;
  loading = false;

  constructor(
    private todoService: TodoService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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
        state: this.label as EState
      }).subscribe(
        data => this.toastrService.success('Todo updated'),
        error => this.toastrService.error(error.error.message)
      );
    }
  }

  createTodo() {
    this.router.navigate([{outlets: {info: 'create'}}], {relativeTo: this.route.parent, skipLocationChange: true});
  }

  editTodo(id: number) {
    this.router.navigate([{outlets: {info: ['edit', `${id}`]}}], {relativeTo: this.route.parent, skipLocationChange: true});
  }

  deleteTodoById(id: number) {
    this.loading = true;

    this.todoService.deleteTodoById(id).subscribe(
      () => {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index > -1) {
          this.todos.splice(index, 1);
          this.loading = false;
          this.toastrService.success('Todo deleted');
        }
      },
      error => {
        this.loading = false;
        this.toastrService.error(error.error.message);
      }
    );
  }
}
