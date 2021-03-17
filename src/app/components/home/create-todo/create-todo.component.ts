import {Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AppSettingsService} from '../../../services/app-settings.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuillModules} from 'ngx-quill';
import {TodoService} from '../../../services/todo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CreateTodo} from '../../../model/create-todo';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateTodoComponent implements OnInit, OnDestroy {

  createTodoFormGroup: FormGroup;
  loading = false;

  editorStyle = {
    height: '200px',
    backgroundColor: '#ffffff'
  };

  editorConfig: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'link'],
      [{list: 'ordered'}, {list: 'bullet'}],
      [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}],
      [{indent: '-1'}, {indent: '+1'}],
      [{color: []}, {background: []}],
      [{header: 1}, {header: 2}],
      [{script: 'sub'}, {script: 'super'}],
      ['clean'],
      [{size: ['small', false, 'large', 'huge']}],
      [{font: []}]
    ]
  };

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
    this.appSettingsService.setInfoSidebarIsOpen(true);

    this.createTodoFormGroup = this.formBuilder.group({
      createTodoPayload: this.formBuilder.group({
        title: new FormControl(null),
        description: new FormControl(null),
        dueDate: new FormControl(null),
        priority: new FormControl(null)
      })
    });

    this.initialized = true;
  }

  ngOnDestroy(): void {
    this.appSettingsService.setInfoSidebarIsOpen(false);
  }

  onSubmit() {
    this.loading = true;

    const createTodo: CreateTodo = this.createTodoFormGroup.controls.createTodoPayload.value;
    createTodo.dueDate = new Date(createTodo.dueDate);

    this.todoService.saveTodo(createTodo).subscribe(
      newTodo => {
        this.loading = false;
        this.toastrService.success(`Todo #${newTodo.id} created successfully`);
        this.createTodoFormGroup.reset();
        this.router.navigate([{outlets: {info: null}}], {relativeTo: this.route.parent, skipLocationChange: true});
      },
      error => {
        this.loading = false;
        this.toastrService.error(error.error.message);
      }
    );
  }

  cancel() {
    this.createTodoFormGroup.reset();
    this.router.navigate([{outlets: {info: null}}], {relativeTo: this.route.parent, skipLocationChange: true});
  }
}
