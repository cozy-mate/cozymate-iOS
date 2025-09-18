import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { CreateRuleRequest, UpdateRuleRequest } from '@/server/rule/request';
import { createRule, deleteRule, getRuleList, updateRule } from '@/server/rule/rule';

export const useDeleteRule = ({ roomId, ruleId }: { roomId: number; ruleId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteRule(roomId, ruleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/rules`, roomId] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useUpdateRule = ({ roomId, ruleId }: { roomId: number; ruleId: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateRuleRequest) => updateRule(roomId, ruleId, data),
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/rules`, roomId] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useGetRuleList = ({ roomId }: { roomId: number }) => {
  return useQuery({
    queryKey: [`/rooms/${roomId}/rules`, roomId],
    queryFn: () => getRuleList(roomId),
    enabled: roomId !== 0,
  });
};

export const useCreateRule = ({ roomId }: { roomId: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRuleRequest) => createRule(roomId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/rules`, roomId] });
      router.back();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
