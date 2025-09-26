import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { exitChatRoom, getChatRoomList, getNewChatRoomCount } from '@/server/chat-room/chat-room';
import { queries } from '@/server';
import { GetChatRoomListResponse } from '@/server/chat-room/response';

export const useExitChatRoom = (chatRoomId: number) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => exitChatRoom(chatRoomId),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.chatRooms.list({ size: 5 }));
      router.back();
    },
  });
};

export const useGetChatRoomList = () => {
  return useSuspenseInfiniteQuery({
    ...queries.chatRooms.list({ size: 5 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetChatRoomListResponse) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};

export const useGetNewChatRoomCount = () => {
  return useSuspenseQuery(queries.chatRooms.countNewChat());
};
