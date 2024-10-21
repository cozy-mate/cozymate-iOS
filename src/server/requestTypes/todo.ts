export interface UpdateTodoRequest {
  todoId: number;
  content: string;
  timePoint: string;
}

export interface ChangeTodoStateRequest {
  todoId: number;
  completed: boolean;
}

export interface AddMyTodoRequest {
  content: string;
  timePoint: string;
}
