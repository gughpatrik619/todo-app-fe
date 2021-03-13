import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from '../model/todo';
import {EState} from '../model/e-state.enum';

@Pipe({
  name: 'stateFilter'
})
export class StateFilterPipe implements PipeTransform {

  transform(list: Todo[], states: EState[]) {
    return list.filter(todo => states.includes(todo.state));
  }

}
