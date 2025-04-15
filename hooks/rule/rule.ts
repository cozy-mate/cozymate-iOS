import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { CreateRuleRequest, UpdateRuleRequest } from '@/apis/rule/request';
import { createRule, deleteRule, getRuleList, updateRule } from '@/apis/rule/rule';
import { useHasRoomStore } from '@/zustand/room/room';

export const useDeleteRule = (roomId: number, ruleId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteRule(roomId, ruleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/rules`] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useUpdateRule = (roomId: number, ruleId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateRuleRequest) => updateRule(roomId, ruleId, data),
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/rules`] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useGetRuleList = (roomId: number) => {
  const { roomInfo } = useHasRoomStore();

  return useQuery({
    queryKey: [`/rooms/${roomId}/rules`, roomId],
    queryFn: () => getRuleList(roomId),
    enabled: roomInfo.roomId !== 0,
  });
};

export const useCreateRule = (roomId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRuleRequest) => createRule(roomId, data),
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/rules`] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
