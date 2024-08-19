export interface ChangeTodoStateRequest {
  todoId: number;
  completed: boolean;
}

export interface AddMyTodoRequest {
  content: string;
  timePoint: string;
}
