import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { CreateTodoRequest, UpdateTodoRequest } from '@/server/todo/request';
import {
  createTodo,
  deleteTodo,
  getTodoList,
  toggleTodoDone,
  updateTodo,
} from '@/server/todo/todo';
import { useHasRoomStore } from '@/zustand/room/room';

export const useDeleteTodo = (roomId: number, todoId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTodo(roomId, todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/todos`] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useUpdateTodo = (roomId: number, todoId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTodoRequest) => updateTodo(roomId, todoId, data),
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/todos`] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useGetTodoList = (roomId: number, timePoint?: string) => {
  const { roomInfo } = useHasRoomStore();

  return useQuery({
    queryKey: [`/rooms/${roomId}/todos`, roomId, timePoint],
    queryFn: () => getTodoList(roomId, timePoint),
    enabled: roomInfo.roomId !== 0,
  });
};

export const useToggleTodoDone = (roomId: number, refetch: () => void) => {
  return useMutation({
    mutationFn: ({ todoId, completed }: { todoId: number; completed: boolean }) =>
      toggleTodoDone(roomId, todoId, completed),
    onSuccess: () => {
      refetch();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useCreateTodo = (roomId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTodoRequest) => createTodo(roomId, data),
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/todos`] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
