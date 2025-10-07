import { useInfiniteQuery, useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { queries } from '@/server';
import { exitMessageRoom } from '@/server/message-room/message-room';
import { GetMessageRoomListResponse } from '@/server/message-room/response';

export const useExitMessageRoom = (messageRoomId: number) => {
  return useMutation({
    mutationFn: () => exitMessageRoom(messageRoomId),
  });
};

export const useGetMessageRoomList = () => {
  return useInfiniteQuery({
    ...queries.messageRooms.list({ size: 5 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetMessageRoomListResponse) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};

export const useGetNewMessageRoomCount = () => {
  return useSuspenseQuery(queries.messageRooms.countNewMessage());
};
