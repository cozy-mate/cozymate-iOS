import { useMutation, useSuspenseQuery, UseMutationResult } from '@tanstack/react-query';

import { AddMyTodoRequest, UpdateTodoRequest } from '@server/requestTypes/todo';
import { addMyTodo, updateTodo, deleteTodo, getTodoData, changeTodoState } from '@server/api/todo';
import {
  AddMyTodoResponse,
  UpdateTodoResponse,
  DeleteTodoResponse,
  GetTodoDataResponse,
  ChangeTodoStateResponse,
} from '@server/responseTypes/todo';

import { sendButtonEvent } from '@utils/ga/sendButtonEvent';
import { ButtonEvent } from '@utils/ga/eventEnum';

type DeleteTodoVariables = { roomId: number; todoId: number };

// Todo 삭제
export const useDeleteTodo = (
  refetch: () => void,
): UseMutationResult<DeleteTodoResponse, void, DeleteTodoVariables, unknown> => {
  return useMutation({
    mutationFn: ({ roomId, todoId }) => deleteTodo(roomId, todoId),
    onSuccess: () => refetch(),
  });
};

// Todo 생성
export const useAddMyTodo = (
  roomId: number,
  refetchTodoData: () => void,
): UseMutationResult<AddMyTodoResponse, void, AddMyTodoRequest, unknown> => {
  return useMutation({
    mutationFn: (addMyTodoRequest: AddMyTodoRequest) => addMyTodo(roomId, addMyTodoRequest),
    onSuccess: () => {
      sendButtonEvent(ButtonEvent.ConfirmTodo);
      refetchTodoData();
    },
  });
};

// Todo 상태 변경 (완료 <-> 미완료)
export const useChangeTodo = (
  roomId: number,
  refetchTodoData: () => void,
): UseMutationResult<ChangeTodoStateResponse, void, { todoId: number; completed: boolean }> => {
  return useMutation({
    mutationFn: async ({ todoId, completed }: { todoId: number; completed: boolean }) =>
      changeTodoState(roomId, todoId, completed),
    onSuccess: () => {
      // mutation 성공 시, Todo 데이터를 다시 불러옴
      refetchTodoData();
    },
  });
};

// Todo 조회
export const useGetTodoData = (
  roomId: number,
  timePoint?: string,
): { data: GetTodoDataResponse; refetch: () => void } => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['tododata', roomId, timePoint],
    queryFn: () => getTodoData(roomId, timePoint),
    select: (response: GetTodoDataResponse) => {
      return response;
    },
    refetchInterval: 3000,
  });

  return { data, refetch };
};

// Todo 수정
export const useUpdateTodo = (
  roomId: number,
  todoId: number,
  refetchTodoData: () => void,
): UseMutationResult<UpdateTodoResponse, void, UpdateTodoRequest, unknown> => {
  return useMutation({
    mutationFn: (updateTodoRequest: UpdateTodoRequest) =>
      updateTodo(roomId, todoId, updateTodoRequest),
    onSuccess: () => {
      refetchTodoData();
    },
  });
};
