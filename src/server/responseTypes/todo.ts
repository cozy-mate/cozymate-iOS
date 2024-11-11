export interface DeleteTodoResponse {
  result: string;
}

export interface MemberDetailItem {
  memberId: number;
  nickname: string;
  gender: string;
  birthday: string;
  universityName: string;
  majorName: string;
  persona: number;
}

export interface TodoItem {
  todoId: number;
  content: string;
  completed: boolean;
  todoType: string;
}

export interface MateTodoItem {
  memberDetail: MemberDetailItem;
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
  result: {
    todoId: number;
  };
}
