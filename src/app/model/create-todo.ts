import {EPriority} from './e-priority.enum';

export interface CreateTodo {
  description: string;
  dueDate: Date;
  priority: EPriority;
  title: string;
}
