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
import { queries } from '@/server';

export const useDeleteTodo = ({ roomId, todoId }: { roomId: number; todoId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTodo(roomId, todoId),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.todo.list({ roomId }));
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
      queryClient.invalidateQueries(queries.todo.list({ roomId }));
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useGetTodoList = ({ roomId, timePoint }: { roomId: number; timePoint?: string }) => {
  return useQuery({
    ...queries.todo.list({ roomId, timePoint }),
    enabled: roomId !== 0,
  });
};

export const useToggleTodoDone = ({ roomId, timePoint }: { roomId: number; timePoint: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, completed }: { todoId: number; completed: boolean }) =>
      toggleTodoDone(roomId, todoId, completed),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.todo.list({ roomId, timePoint }));
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
      queryClient.invalidateQueries(queries.todo.list({ roomId }));

      router.back();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
