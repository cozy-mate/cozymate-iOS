import { MemberTodo } from '@/type/todo';

export interface DeleteTodoResponse {
  result: string;
}

export interface GetTodoListResponse {
  result: {
    timePoint: string;
    myTodoList: MemberTodo;
    mateTodoList: Record<string, MemberTodo>;
  };
}

export interface UpdateTodoResponse {
  result: string;
}

export interface ToggleTodoDoneResponse {
  result: string;
}

export interface CreateTodoResponse {
  result: {
    todoId: number;
  };
}
