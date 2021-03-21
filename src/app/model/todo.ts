import {EPriority} from './e-priority.enum';
import {EState} from './e-state.enum';

export class Todo {
  created: Date;
  description: string;
  dueDate: Date;
  id: number;
  lastUpdated: Date;
  priority: EPriority;
  state: EState;
  title: string;

  q = `line1\nline2`;
}

