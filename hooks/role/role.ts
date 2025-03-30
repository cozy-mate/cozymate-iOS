import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { CreateRoleRequest, UpdateRoleRequest } from '@/apis/role/request';
import { createRole, deleteRole, getRoleList, updateRole } from '@/apis/role/role';

export const useDeleteRole = (roomId: number, roleId: number) => {
  return useMutation({
    mutationFn: () => deleteRole(roomId, roleId),
  });
};

export const useUpdateRole = (roomId: number, roleId: number) => {
  return useMutation({
    mutationFn: (data: UpdateRoleRequest) => updateRole(roomId, roleId, data),
  });
};

export const useGetRoleList = (roomId: number) => {
  return useSuspenseQuery({
    queryKey: [`/rooms/${roomId}/roles`, roomId],
    queryFn: () => getRoleList(roomId),
  });
};

export const useCreateRole = (roomId: number, refetch: () => void) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateRoleRequest) => createRole(roomId, data),
    onSuccess: () => {
      router.back();
      refetch();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
