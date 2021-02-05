import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Todo} from '../../../model/todo';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {TodoService} from '../../../services/todo.service';
import {ToastrService} from 'ngx-toastr';
import {UpdateTodo} from '../../../model/update-todo';

@Component({
  selector: 'app-edit-todo-modal',
  templateUrl: './edit-todo-modal.component.html',
  styleUrls: ['./edit-todo-modal.component.css']
})
export class EditTodoModalComponent implements OnInit, OnChanges {

  @Input() todoToEdit: Todo;
  @Output() updateTodoEvent = new EventEmitter<Todo>();

  editTodoFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.editTodoFormGroup = this.formBuilder.group({
      editTodoPayload: this.formBuilder.group({
        title: new FormControl(),
        description: new FormControl(null),
        dueDate: new FormControl(null),
        priority: new FormControl(null),
        state: new FormControl(null)
      })
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const todoToEdit: UpdateTodo = changes.todoToEdit.currentValue;
    if (todoToEdit !== null && todoToEdit !== undefined) {
      this.editTodoFormGroup.get('editTodoPayload.title').setValue(todoToEdit.title);
      this.editTodoFormGroup.get('editTodoPayload.description').setValue(todoToEdit.description);
      this.editTodoFormGroup.get('editTodoPayload.dueDate').setValue(todoToEdit.dueDate);
      this.editTodoFormGroup.get('editTodoPayload.priority').setValue(todoToEdit.priority);
      this.editTodoFormGroup.get('editTodoPayload.state').setValue(todoToEdit.state);
    }
  }


  onSubmit() {
    const editTodo: UpdateTodo = this.editTodoFormGroup.controls.editTodoPayload.value;
    editTodo.dueDate = new Date(editTodo.dueDate);

    console.log(editTodo);
  }
}
