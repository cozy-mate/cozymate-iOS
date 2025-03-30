import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { CreateTodoRequest, UpdateTodoRequest } from '@/apis/todo/request';
import { createTodo, deleteTodo, getTodoList, toggleTodoDone, updateTodo } from '@/apis/todo/todo';

export const useDeleteTodo = (roomId: number, todoId: number) => {
  return useMutation({
    mutationFn: () => deleteTodo(roomId, todoId),
  });
};

export const useUpdateTodo = (roomId: number, todoId: number) => {
  return useMutation({
    mutationFn: (data: UpdateTodoRequest) => updateTodo(roomId, todoId, data),
  });
};

export const useGetTodoList = (roomId: number, timePoint?: string) => {
  return useSuspenseQuery({
    queryKey: [`/rooms/${roomId}/todos`, roomId, timePoint],
    queryFn: () => getTodoList(roomId, timePoint),
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

export const useCreateTodo = (roomId: number, refetch: () => void) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateTodoRequest) => createTodo(roomId, data),
    onSuccess: () => {
      router.back();
      refetch();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
