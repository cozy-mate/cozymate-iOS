import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { createRule, deleteRule, getRuleList, updateRule } from '@/apis/rule/rule';
import { useHasRoomStore } from '@/zustand/room/room';

import { CreateRuleRequest, UpdateRuleRequest } from '@/apis/rule/request';

export const useDeleteRule = (roomId: number, ruleId: number) => {
  return useMutation({
    mutationFn: () => deleteRule(roomId, ruleId),
  });
};

export const useUpdateRule = (roomId: number, ruleId: number) => {
  return useMutation({
    mutationFn: (data: UpdateRuleRequest) => updateRule(roomId, ruleId, data),
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

export const useCreateRule = (roomId: number, refetch: () => void) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateRuleRequest) => createRule(roomId, data),
    onSuccess: () => {
      router.back();
      refetch();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
