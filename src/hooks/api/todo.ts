import { useMutation, useSuspenseQuery, UseMutationResult } from '@tanstack/react-query';

import { addMyTodo, getTodoData, changeTodoState } from '@server/api/todo';
import { AddMyTodoRequest, ChangeTodoStateRequest } from '@server/requestTypes/todo';
import {
  AddMyTodoResponse,
  GetTodoDataResponse,
  ChangeTodoStateResponse,
} from '@server/responseTypes/todo';

// Todo 생성
export const useAddMyTodo = (
  roomId: number,
  refetchTodoData: () => void,
): UseMutationResult<AddMyTodoResponse, void, AddMyTodoRequest, unknown> => {
  return useMutation({
    mutationFn: (addMyTodoRequest: AddMyTodoRequest) => addMyTodo(roomId, addMyTodoRequest),
    onSuccess: () => {
      refetchTodoData();
    },
  });
};

// Todo 상태 변경 (완료 <-> 미완료)
export const useChangeTodo = (
  refetchTodoData: () => void,
): UseMutationResult<ChangeTodoStateResponse, void, ChangeTodoStateRequest> => {
  return useMutation({
    mutationFn: (changeTodoStateRequest: ChangeTodoStateRequest) =>
      changeTodoState(changeTodoStateRequest),
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
