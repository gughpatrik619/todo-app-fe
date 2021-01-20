import {Component, OnInit} from '@angular/core';
import {Todo} from '../../model/todo';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todos: Todo[] = [];

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    // this.todoService.getTodos().subscribe(data => this.todos = data);
  }

}
