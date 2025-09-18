import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { CreateRoleRequest, UpdateRoleRequest } from '@/server/role/request';
import { createRole, deleteRole, getRoleList, updateRole } from '@/server/role/role';

export const useDeleteRole = ({ roomId, roleId }: { roomId: number; roleId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteRole(roomId, roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/roles`, roomId] });
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
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/roles`, roomId] });
      router.back();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useGetRoleList = ({ roomId }: { roomId: number }) => {
  return useQuery({
    queryKey: [`/rooms/${roomId}/roles`, roomId],
    queryFn: () => getRoleList(roomId),
    enabled: roomId !== 0,
  });
};

export const useCreateRole = ({ roomId }: { roomId: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleRequest) => createRole(roomId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/roles`, roomId] });
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/todos`, roomId] });

      router.back();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
