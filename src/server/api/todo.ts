import {
  GetAxiosInstance,
  PostAxiosInstance,
  PatchAxiosInstance,
  DeleteAxiosInstance,
} from '@axios/axios.method';

import { AddMyTodoRequest, ChangeTodoStateRequest } from '@server/requestTypes/todo';
import {
  AddMyTodoResponse,
  DeleteTodoResponse,
  ChangeTodoStateResponse,
} from '@server/responseTypes/todo';

import { AdditionalLifeStyleScreenProps } from '@type/param/loginStack';

// 특정 방의 특정 Todo 삭제
export const deleteTodo = async (todoId: number): Promise<DeleteTodoResponse> => {
  const response = await DeleteAxiosInstance<DeleteTodoResponse>(`/todo`, {
    params: {
      todoId: todoId,
    },
  });

  return response.data;
};

// 특정 방의 특정 날짜 기준 룸메별 Todo 조회
export const getTodoData = async (roomId: number, timePoint?: string) => {
  const response = await GetAxiosInstance(`/todo/${roomId}`, {
    params: {
      timePoint: timePoint,
    },
  });

  return response.data;
};

// Todo 완료 여부를 변경
export const changeTodoState = async (
  data: ChangeTodoStateRequest,
): Promise<ChangeTodoStateResponse> => {
  const response = await PatchAxiosInstance<ChangeTodoStateResponse>(`/todo/state`, data);

  return response.data;
};

// 특정 방에 본인의 Todo 생성
export const addMyTodo = async (
  roomId: number,
  data: AddMyTodoRequest,
): Promise<AddMyTodoResponse> => {
  const response = await PostAxiosInstance<AdditionalLifeStyleScreenProps>(`/todo/${roomId}`, data);

  return response.data;
};
