import { useMutation, useQueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { sendChat } from '@/server/chat/chat';
import { SendChatRequest } from '@/server/chat/request';
import { queries } from '@/server';
import { GetChatRoomDetailResponse } from '@/server/chat/response';

export const useGetChatRoomDetail = (chatRoomId: number) => {
  return useSuspenseInfiniteQuery({
    ...queries.chat.detail({ chatRoomId, size: 5 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetChatRoomDetailResponse) => {
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
      queryClient.invalidateQueries(queries.chatRooms.list());

      // 쪽지방이 이전에 있는 경우
      if (chatRoomId) {
        queryClient.invalidateQueries(queries.chatRooms.id({ recipientId: chatRoomId }));
      }
      router.back();
    },
  });
};
