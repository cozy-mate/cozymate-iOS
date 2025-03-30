import { MemberDetail } from './member';

export interface TodoItem {
  todoId: number;
  content: string;
  completed: boolean;
  todoType: string;
  mateIdList: number[];
}

export interface MemberTodo {
  memberDetail: MemberDetail;
  todoList: TodoItem[];
}
