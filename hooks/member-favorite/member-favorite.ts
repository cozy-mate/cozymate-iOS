import { useMutation, useQueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import {
  createMemberLike,
  deleteMemberLike,
  getMemberLikeList,
} from '@/server/member-favorite/member-favorite';
import { matchMultiQueries, queries } from '@/server';
import { GetMemberLikeListResponse } from '@/server/member-favorite/response';

export const useDeleteMemberLike = (memberFavoriteId: number, memberId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteMemberLike(memberFavoriteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.memberFavorite.list._def,
          queries.memberStat.detail({ memberId }).queryKey,
        ]),
      });
    },
  });
};

export const useGetMemberLikeList = () => {
  return useSuspenseInfiniteQuery({
    ...queries.memberFavorite.list({ size: 5 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetMemberLikeListResponse) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};

export const useCreateMemberLike = (memberId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createMemberLike(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.memberFavorite.list._def,
          queries.memberStat.detail({ memberId }).queryKey,
        ]),
      });
    },
  });
};
