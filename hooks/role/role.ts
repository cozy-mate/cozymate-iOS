import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { CreateRoleRequest, UpdateRoleRequest } from '@/apis/role/request';
import { createRole, deleteRole, getRoleList, updateRole } from '@/apis/role/role';
import { useHasRoomStore } from '@/zustand/room/room';

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
  const { roomInfo } = useHasRoomStore();

  return useQuery({
    queryKey: [`/rooms/${roomId}/roles`, roomId],
    queryFn: () => getRoleList(roomId),
    enabled: roomInfo.roomId !== 0,
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
