import { useMutation, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import {
  createMemberLike,
  deleteMemberLike,
  getMemberLikeList,
} from '@/server/member-favorite/member-favorite';

export const useDeleteMemberLike = (memberFavoriteId: number, refetch: () => void) => {
  return useMutation({
    mutationFn: () => deleteMemberLike(memberFavoriteId),
    onSuccess: () => refetch(),
  });
};

export const useGetMemberLikeList = () => {
  return useSuspenseInfiniteQuery({
    queryKey: [`/favorites/members`],
    queryFn: ({ pageParam }) => getMemberLikeList(pageParam, 5),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};

export const useCreateMemberLike = (memberId: number, refetch: () => void) => {
  return useMutation({
    mutationFn: () => createMemberLike(memberId),
    onSuccess: () => refetch(),
  });
};
