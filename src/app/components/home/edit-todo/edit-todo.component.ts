import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {

  todoId: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('edit todo comp created');

    this.route.paramMap.subscribe(() => {
      this.todoId = +this.route.snapshot.paramMap.get('id');
      console.log(`id: ${this.todoId}`);
    });
  }

}
