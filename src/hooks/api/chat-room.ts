import { useMutation, useSuspenseQuery, UseMutationResult } from '@tanstack/react-query';

import { getChatRoomId, deleteChatRoom, getChatRoomList } from '@server/api/chat-room';
import {
  GetChatRoomIdResponse,
  DeleteChatRoomResponse,
  GetChatRoomListResponse,
} from '@server/responseTypes/chat-room';

// 쪽지방 삭제 기능
export const useDeleteChatRoom = (
  chatRoomId: number,
  refetch: () => void,
): UseMutationResult<DeleteChatRoomResponse> => {
  return useMutation({
    mutationFn: () => deleteChatRoom(chatRoomId),
    onSuccess: () => refetch(),
  });
};

// 쪽지방 목록 조회
export const useGetChatRoomList = (): {
  data: GetChatRoomListResponse;
  refetch: () => void;
} => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['chatroomlists'],
    queryFn: () => getChatRoomList(),
    select: (reseponse: GetChatRoomListResponse) => {
      return reseponse;
    },
  });

  return { data, refetch };
};

// 쪽지방 아이디 조회
export const useGetChatRoomId = (
  recipientId: number,
): {
  data: GetChatRoomIdResponse;
  refetch: () => void;
} => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['chatroomid', recipientId],
    queryFn: () => getChatRoomId(recipientId),
    select: (response: GetChatRoomIdResponse) => {
      return response;
    },
  });

  return { data, refetch };
};
