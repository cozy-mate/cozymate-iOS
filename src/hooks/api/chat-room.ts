import { getChatRoomList } from '@server/api/chat-room';
import { GetChatRoomListResponse } from '@server/responseTypes/chat-room';
import { useSuspenseQuery } from '@tanstack/react-query';

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
