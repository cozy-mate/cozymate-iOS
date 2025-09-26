import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import {
  blockMember,
  getBlockedMemberList,
  getMemberBlockStatus,
  unblockMember,
} from '@/server/member-block/member-block';
import { showSuccessToast } from '@/utils/toast';
import { matchMultiQueries, queries } from '@/server';

// 멤버 차단 해제
export const useUnblockMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: number) => unblockMember(memberId),
    onSuccess: (_data, variables) => {
      const memberId = variables;

      showSuccessToast('차단 해제 되었습니다');

      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.memberBlock.list._def,
          queries.memberBlock.status({ memberId }).queryKey,
          queries.memberStat.list._def,
        ]),
      });
    },
  });
};

// 특정 멤버 차단 여부 조회
export const useGetMemberBlockStatus = (memberId: number) => {
  return useSuspenseQuery(queries.memberBlock.status({ memberId }));
};

// 멤버 차단 목록 조회
export const useGetBlockedMemberList = () => {
  return useSuspenseQuery(queries.memberBlock.list());
};

// 멤버 차단
export const useBlockMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: number) => blockMember(memberId),
    onSuccess: (_data, variables) => {
      const memberId = variables;

      showSuccessToast('차단이 접수되었습니다');
      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.memberBlock.list._def,
          queries.memberBlock.status({ memberId }).queryKey,
          queries.memberStat.list._def,
        ]),
      });
    },
  });
};
