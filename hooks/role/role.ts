import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { CreateRoleRequest, UpdateRoleRequest } from '@/server/role/request';
import { createRole, deleteRole, getRoleList, updateRole } from '@/server/role/role';
import { useHasRoomStore } from '@/zustand/room/room';

export const useDeleteRole = (roomId: number, roleId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteRole(roomId, roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/roles`] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useUpdateRole = (roomId: number, roleId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateRoleRequest) => updateRole(roomId, roleId, data),
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/roles`] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useGetRoleList = (roomId: number) => {
  const { roomInfo } = useHasRoomStore();

  return useQuery({
    queryKey: [`/rooms/${roomId}/roles`, roomId],
    queryFn: () => getRoleList(roomId),
    enabled: roomInfo.roomId !== 0,
  });
};

export const useCreateRole = (roomId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleRequest) => createRole(roomId, data),
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/roles`] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
