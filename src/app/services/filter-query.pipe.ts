import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from '../model/todo';

@Pipe({
  name: 'filterQuery',
  pure: false
})
export class FilterQueryPipe implements PipeTransform {
  transform(todos: Todo[], filterQuery: string): any {
    if (!todos || !filterQuery) {
      return todos;
    }

    return todos.filter(todo => todo.id.toString().indexOf(filterQuery) > -1 ||
      todo.title.toLowerCase().indexOf(filterQuery.toLowerCase()) > -1 ||
      todo.state.toLowerCase().indexOf(filterQuery.toLowerCase()) > -1 ||
      todo.priority.toLowerCase().indexOf(filterQuery.toLowerCase()) > -1);
  }
}
