import { useMutation, useQueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { getChatRoomDetail, sendChat } from '@/server/chat/chat';
import { SendChatRequest } from '@/server/chat/request';

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

export const useSendChat = (recipientId: number, chatRoomId?: number) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendChatRequest) => sendChat(recipientId, data),
    onSuccess: () => {
      if (chatRoomId) {
        console.log('호출');
        queryClient.invalidateQueries({ queryKey: [`/chats/chatrooms/${chatRoomId}`, chatRoomId] });
      }
      router.back();
    },
  });
};
