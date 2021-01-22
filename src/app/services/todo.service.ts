import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../model/todo';
import {StorageService} from './storage.service';

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
  }

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`http://localhost:8081/api/users/${this.getUserName()}/todos`, httpOptions);
  }

  private getUserName() {
    return this.storageService.retrieveUsername();
  }
}
