import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TodoService} from '../../../services/todo.service';
import {CreateTodo} from '../../../model/create-todo';
import {ToastrService} from 'ngx-toastr';
import {Todo} from '../../../model/todo';

@Component({
  selector: 'app-create-todo-modal',
  templateUrl: './create-todo-modal.component.html',
  styleUrls: ['./create-todo-modal.component.css']
})
export class CreateTodoModalComponent implements OnInit {

  @Output() createTodoEvent = new EventEmitter<Todo>();

  createTodoFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.createTodoFormGroup = this.formBuilder.group({
      createTodoPayload: this.formBuilder.group({
        title: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        dueDate: new FormControl(null, Validators.required),
        priority: new FormControl(null, Validators.required)
      })
    });
  }

  get titleFormControl() {
    return this.createTodoFormGroup.get('createTodoPayload.title');
  }

  get descriptionFormControl() {
    return this.createTodoFormGroup.get('createTodoPayload.description');
  }

  get dueDateFormControl() {
    return this.createTodoFormGroup.get('createTodoPayload.dueDate');
  }

  get priorityFormControl() {
    return this.createTodoFormGroup.get('createTodoPayload.priority');
  }

  onSubmit() {
    if (this.createTodoFormGroup.invalid) {
      this.toastrService.error('Invalid inputs');
      this.titleFormControl.markAsDirty();
      this.descriptionFormControl.markAsDirty();
      this.dueDateFormControl.markAsDirty();
      this.priorityFormControl.markAsDirty();

      return;
    }

    const createTodo: CreateTodo = this.createTodoFormGroup.controls.createTodoPayload.value;
    createTodo.dueDate = new Date(createTodo.dueDate);

    this.todoService.saveTodo(createTodo).subscribe(
      data => {
        this.toastrService.success('Todo created');
        this.createTodoEvent.emit(data);
      }, error => this.toastrService.error(error.error.error)
    );

    this.createTodoFormGroup.reset();
  }
}
