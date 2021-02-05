import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../model/todo';
import {StorageService} from './storage.service';
import {CreateTodo} from '../model/create-todo';
import {UpdateTodo} from '../model/update-todo';

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private static readonly API_URL = 'http://localhost:8081/api';

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
  }

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${TodoService.API_URL}/users/${this.getUserName()}/todos`, httpOptions);
  }

  saveTodo(createTodo: CreateTodo): Observable<Todo> {
    return this.httpClient.post<Todo>(`${TodoService.API_URL}/users/${this.getUserName()}/todos`, createTodo, httpOptions);
  }

  updateTodo(id: number, updateTodo: UpdateTodo): Observable<Todo> {
    return this.httpClient.put<Todo>(`${TodoService.API_URL}/users/${this.getUserName()}/todos/${id}`, updateTodo, httpOptions);
  }

  deleteTodoById(id: number) {
    return this.httpClient.delete(`${TodoService.API_URL}/users/${this.getUserName()}/todos/${id}`);
  }

  private getUserName() {
    return this.storageService.retrieveUsername();
  }
}
