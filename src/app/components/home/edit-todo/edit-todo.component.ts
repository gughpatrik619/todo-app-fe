import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TodoService} from '../../../services/todo.service';
import {AppSettingsService} from '../../../services/app-settings.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UpdateTodo} from '../../../model/update-todo';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {

  todoId: number;
  editTodoFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private appSettingsService: AppSettingsService,
    private route: ActivatedRoute,
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

    this.route.paramMap.subscribe(() => {
      this.todoId = +this.route.snapshot.paramMap.get('id');

      this.todoService.getTodoById(this.todoId).subscribe(todo => {
        this.editTodoFormGroup.get('editTodoPayload.title').setValue(todo.title);
        this.editTodoFormGroup.get('editTodoPayload.description').setValue(todo.description);
        const due = new Date(todo.dueDate).toISOString();
        this.editTodoFormGroup.get('editTodoPayload.dueDate').setValue(due.substring(0, due.length - 1));
        this.editTodoFormGroup.get('editTodoPayload.priority').setValue(todo.priority);
        this.editTodoFormGroup.get('editTodoPayload.state').setValue(todo.state);
      });
    });
  }

  onSubmit() {
    const updateTodo: UpdateTodo = this.editTodoFormGroup.controls.editTodoPayload.value;
    updateTodo.dueDate = new Date(updateTodo.dueDate);

    console.log(updateTodo);

    // this.todoService.updateTodo(this.todoId, updateTodo).subscribe(
    //   data => {
    //     this.toastrService.success('Todo updated');
    //   }, error => this.toastrService.error(error.error.message)
    // );

    this.editTodoFormGroup.reset();
  }
}
