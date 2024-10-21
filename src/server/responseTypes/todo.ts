export interface DeleteTodoResponse {
  result: string;
}

export interface TodoItem {
  id: number;
  content: string;
  completed: boolean;
}

export interface MateTodoItem {
  persona: number;
  mateTodoList: TodoItem[];
}

export interface GetTodoDataResponse {
  result: {
    timePoint: string;
    myTodoList: MateTodoItem;
    mateTodoList: {
      [key: string]: MateTodoItem;
    };
  };
}

export interface UpdateTodoResponse {
  result: string;
}

export interface ChangeTodoStateResponse {
  result: string;
}

export interface AddMyTodoResponse {
  result: string;
}
