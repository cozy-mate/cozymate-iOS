export interface DeleteTodoResponse {
  result: string;
}

interface MemberDetailItem {
  memberId: number;
  nickname: string;
  gender: string;
  birthday: string;
  universityName: string;
  majorName: string;
  persona: number;
}

interface TodoItem {
  todoId: number;
  content: string;
  completed: boolean;
  todoType: string;
  mateIdList: number[];
}

export interface MateTodoItem {
  memberDetail: MemberDetailItem;
  todoList: TodoItem[];
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
