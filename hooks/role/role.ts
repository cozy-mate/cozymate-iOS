import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { CreateRoleRequest, UpdateRoleRequest } from '@/server/role/request';
import { createRole, deleteRole, getRoleList, updateRole } from '@/server/role/role';
import { matchMultiQueries, queries } from '@/server';

export const useDeleteRole = ({ roomId, roleId }: { roomId: number; roleId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteRole(roomId, roleId),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.role.list({ roomId }));
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useUpdateRole = ({ roomId, roleId }: { roomId: number; roleId: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateRoleRequest) => updateRole(roomId, roleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.role.list({ roomId }));
      router.back();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useGetRoleList = ({ roomId }: { roomId: number }) => {
  return useQuery({
    ...queries.role.list({ roomId }),
    enabled: roomId !== 0,
  });
};

export const useCreateRole = ({ roomId }: { roomId: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleRequest) => createRole(roomId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.role.list({ roomId }).queryKey,
          queries.todo.list({ roomId }).queryKey,
        ]),
      });

      router.back();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
