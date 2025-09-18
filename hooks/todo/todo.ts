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

export const useDeleteTodo = ({ roomId, todoId }: { roomId: number; todoId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTodo(roomId, todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/todos`, roomId] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useUpdateTodo = ({ roomId, todoId }: { roomId: number; todoId: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTodoRequest) => updateTodo(roomId, todoId, data),
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/todos`, roomId] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useGetTodoList = ({ roomId, timePoint }: { roomId: number; timePoint?: string }) => {
  return useQuery({
    queryKey: [`/rooms/${roomId}/todos`, roomId, timePoint],
    queryFn: () => getTodoList(roomId, timePoint),
    enabled: roomId !== 0,
  });
};

export const useToggleTodoDone = ({ roomId, timePoint }: { roomId: number; timePoint: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, completed }: { todoId: number; completed: boolean }) =>
      toggleTodoDone(roomId, todoId, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/todos`, roomId, timePoint] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useCreateTodo = ({ roomId }: { roomId: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTodoRequest) => createTodo(roomId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/todos`, roomId] });
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/roles`, roomId] });

      router.back();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
