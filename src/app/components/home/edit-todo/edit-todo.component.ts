import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

  private initialized = false;

  constructor(
    private elRef: ElementRef,
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private appSettingsService: AppSettingsService,
    private route: ActivatedRoute,
    private router: Router,
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

        this.initialized = true;
      });
    });
  }

  onSubmit() {
    const updateTodo: UpdateTodo = this.editTodoFormGroup.controls.editTodoPayload.value;
    updateTodo.dueDate = new Date(updateTodo.dueDate);

    this.todoService.updateTodo(this.todoId, updateTodo).subscribe(
      _ => {
        this.toastrService.success(`Todo #${this.todoId} updated successfully`);
        this.editTodoFormGroup.reset();
        this.appSettingsService.setInfoSidebarIsOpen(false);
        this.router.navigateByUrl('/home/table');
      },
      error => this.toastrService.error(error.error.message)
    );
  }

  @HostListener('document:click', ['$event'])
  onClickOut(event: Event) {
    if (this.initialized && !this.elRef.nativeElement.contains(event.target)) {
      this.editTodoFormGroup.reset();
      this.appSettingsService.setInfoSidebarIsOpen(false);
      this.router.navigateByUrl('/home/table');
    }
  }
}
