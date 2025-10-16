import { useMutation, useQueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { queries } from '@/server';
import { sendMessage } from '@/server/message/message';
import { SendMessageRequest } from '@/server/message/request';
import { GetMessageRoomDetailResponse } from '@/server/message/response';

export const useGetMessageRoomDetail = (messageRoomId: number) => {
  return useSuspenseInfiniteQuery({
    ...queries.message.detail({ messageRoomId, size: 5 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetMessageRoomDetailResponse) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};

export const useSendMessage = (recipientId: number, messageRoomId?: number) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendMessageRequest) => sendMessage(recipientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.messageRooms.list());

      // 쪽지방이 이전에 있는 경우
      if (messageRoomId) {
        queryClient.invalidateQueries(queries.messageRooms.id({ recipientId: messageRoomId }));
      }
      router.back();
    },
  });
};
