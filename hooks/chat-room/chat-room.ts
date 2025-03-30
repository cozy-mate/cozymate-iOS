import { useMutation, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { exitChatRoom, getChatRoomList, getNewChatRoomCount } from '@/apis/chat-room/chat-room';

export const useExitChatRoom = (chatRoomId: number, refetch: () => void) => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => exitChatRoom(chatRoomId),
    onSuccess: () => {
      refetch();
      router.back();
    },
  });
};

export const useGetChatRoomList = () => {
  return useSuspenseInfiniteQuery({
    queryKey: [`/chatrooms`],
    queryFn: ({ pageParam }) => getChatRoomList(pageParam, 5),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};

export const useGetNewChatRoomCount = () => {
  return useSuspenseQuery({
    queryKey: [`/chatrooms/count/new-chat`],
    queryFn: () => getNewChatRoomCount(),
  });
};
