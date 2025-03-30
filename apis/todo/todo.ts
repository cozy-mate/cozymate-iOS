import {
  DeleteAxiosInstance,
  GetAxiosInstance,
  PatchAxiosInstance,
  PostAxiosInstance,
} from '@/axios/axios.method';

import { CreateTodoRequest, UpdateTodoRequest } from './request';
import {
  CreateTodoResponse,
  DeleteTodoResponse,
  GetTodoListResponse,
  ToggleTodoDoneResponse,
  UpdateTodoResponse,
} from './response';

// 특정 방의 특정 Todo 삭제
export const deleteTodo = async (roomId: number, todoId: number): Promise<DeleteTodoResponse> => {
  const response = await DeleteAxiosInstance<DeleteTodoResponse>(
    `/rooms/${roomId}/todos/${todoId}`,
  );

  return response.data;
};

// 특정 방의 특정 날짜 기준 룸메별 To-Do 조회
export const getTodoList = async (
  roomId: number,
  timePoint?: string,
): Promise<GetTodoListResponse> => {
  const response = await GetAxiosInstance<GetTodoListResponse>(`/rooms/${roomId}/todos`, {
    params: { timePoint },
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
export const toggleTodoDone = async (
  roomId: number,
  todoId: number,
  completed: boolean,
): Promise<ToggleTodoDoneResponse> => {
  const response = await PatchAxiosInstance<ToggleTodoDoneResponse>(
    `/rooms/${roomId}/todos/${todoId}/state`,
    null,
    {
      params: { completed },
    },
  );

  return response.data;
};

// 특정 방에 본인의 Todo 생성
export const createTodo = async (
  roomId: number,
  data: CreateTodoRequest,
): Promise<CreateTodoResponse> => {
  const response = await PostAxiosInstance<CreateTodoResponse>(`/rooms/${roomId}/todos`, data);

  return response.data;
};
