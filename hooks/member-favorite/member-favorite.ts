import { useMutation, useQueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import {
  createMemberLike,
  deleteMemberLike,
  getMemberLikeList,
} from '@/server/member-favorite/member-favorite';

export const useDeleteMemberLike = (memberFavoriteId: number, memberId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteMemberLike(memberFavoriteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/members/stat/${memberId}`, memberId] });
      queryClient.invalidateQueries({ queryKey: [`/favorites/members`] });
    },
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

export const useCreateMemberLike = (memberId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createMemberLike(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/members/stat/${memberId}`, memberId] });
      queryClient.invalidateQueries({ queryKey: [`/favorites/members`] });
    },
  });
};
