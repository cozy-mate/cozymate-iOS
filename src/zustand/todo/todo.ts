import { create } from 'zustand';

import { TodoItem } from './type';

// 투두 1개 정보
export const useTodoItemStore = create<{
  todoItem: TodoItem;
  setTodoItem: (newTodo: TodoItem) => void;
}>((set) => ({
  todoItem: {
    todoId: 0,
    content: '',
    type: '',
    timePoint: '',
    mateIdList: [],
  },
  setTodoItem: (newTodo) => set((state) => ({ todoItem: { ...state.todoItem, ...newTodo } })),
}));
