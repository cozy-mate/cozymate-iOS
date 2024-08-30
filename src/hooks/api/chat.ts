import { getChatDetailData, sendChat } from '@server/api/chat';
import { SendChatRequest } from '@server/requestTypes/chat';
import { GetChatDetailDataResponse, SendChatResponse } from '@server/responseTypes/chat';
import { useMutation, UseMutationResult, useSuspenseQuery } from '@tanstack/react-query';

// 쪽지방 쪽지 상세 내역 조회
export const useGetChatDetailData = (
  chatRoomId: number,
): {
  data: GetChatDetailDataResponse;
  refetch: () => void;
} => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['chatlist', chatRoomId],
    queryFn: () => getChatDetailData(chatRoomId),
    select: (reseponse: GetChatDetailDataResponse) => {
      return reseponse;
    },
  });

  return { data, refetch };
};

// 쪽지 작성 기능
export const useSendChat = (
  recipientId: number,
  //   refetchChat: () => void,
): UseMutationResult<SendChatResponse, void, SendChatRequest, unknown> => {
  return useMutation({
    mutationFn: (sendChatRequest: SendChatRequest) => sendChat(recipientId, sendChatRequest),
    onSuccess: () => {
      //   refetchChat;
    },
  });
};
