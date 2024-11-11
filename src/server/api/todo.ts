import {
  GetAxiosInstance,
  PostAxiosInstance,
  PatchAxiosInstance,
  DeleteAxiosInstance,
} from '@axios/axios.method';

import { AddMyTodoRequest, UpdateTodoRequest } from '@server/requestTypes/todo';
import {
  AddMyTodoResponse,
  DeleteTodoResponse,
  UpdateTodoResponse,
  GetTodoDataResponse,
  ChangeTodoStateResponse,
} from '@server/responseTypes/todo';

// 특정 방의 특정 Todo 삭제
export const deleteTodo = async (roomId: number, todoId: number): Promise<DeleteTodoResponse> => {
  const response = await DeleteAxiosInstance<DeleteTodoResponse>(
    `/rooms/${roomId}/todos/${todoId}`,
  );

  return response.data;
};

// 특정 방의 특정 날짜 기준 룸메별 Todo 조회
export const getTodoData = async (
  roomId: number,
  timePoint?: string,
): Promise<GetTodoDataResponse> => {
  const response = await GetAxiosInstance<GetTodoDataResponse>(`/rooms/${roomId}/todos`, {
    params: {
      timePoint: timePoint,
    },
  });

  return response.data;
};

// Todo의 내용을 수정
export const updateTodo = async (
  roomId: number,
  todoId: number,
  data: UpdateTodoRequest,
): Promise<UpdateTodoResponse> => {
  const response = await PatchAxiosInstance<UpdateTodoResponse>(
    `/rooms/${roomId}/todos/${todoId}`,
    data,
  );

  return response.data;
};

// Todo 완료 여부를 변경
export const changeTodoState = async (
  roomId: number,
  todoId: number,
  completed: boolean,
): Promise<ChangeTodoStateResponse> => {
  const response = await PatchAxiosInstance<ChangeTodoStateResponse>(
    `/rooms/${roomId}/todos/${todoId}/state`,
    { params: { completed: completed } },
  );

  return response.data;
};

// 특정 방에 본인의 Todo 생성
export const addMyTodo = async (
  roomId: number,
  data: AddMyTodoRequest,
): Promise<AddMyTodoResponse> => {
  const response = await PostAxiosInstance<AddMyTodoResponse>(`/rooms/${roomId}/todos`, data);

  return response.data;
};
