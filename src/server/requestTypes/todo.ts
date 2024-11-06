export interface UpdateTodoRequest {
  todoId: number;
  content: string;
  timePoint: string;
}

export interface ChangeTodoStateRequest {
  completed: boolean;
}

export interface AddMyTodoRequest {
  mateIdList: number[];
  content: string;
  timePoint: string;
}
