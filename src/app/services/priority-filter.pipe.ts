import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from '../model/todo';
import {EPriority} from '../model/e-priority.enum';

@Pipe({
  name: 'priorityFilter',
  pure: false
})
export class PriorityFilterPipe implements PipeTransform {

  transform(list: Todo[], priorities: EPriority[]) {
    return list.filter(todo => priorities.includes(todo.priority));
  }
}
