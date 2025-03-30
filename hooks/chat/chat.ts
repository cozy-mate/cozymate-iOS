import { useMutation, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { getChatRoomDetail, sendChat } from '@/apis/chat/chat';
import { SendChatRequest } from '@/apis/chat/request';

export const useGetChatRoomDetail = (chatRoomId: number) => {
  return useSuspenseInfiniteQuery({
    queryKey: [`/chats/chatrooms/${chatRoomId}`, chatRoomId],
    queryFn: ({ pageParam }) => getChatRoomDetail(chatRoomId, pageParam, 5),

    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};

export const useSendChat = (recipientId: number) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SendChatRequest) => sendChat(recipientId, data),
    onSuccess: () => {
      router.back();
    },
  });
};
