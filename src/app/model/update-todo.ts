import {EPriority} from './e-priority.enum';
import {EState} from './e-state.enum';

export interface UpdateTodo {
  description: string;
  dueDate: Date;
  priority: EPriority;
  title: string;
  state: EState;
}
