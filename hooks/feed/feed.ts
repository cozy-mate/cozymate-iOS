import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'expo-router';

import { queries } from '@/server';
import { createMyRoomFeed, updateMyRoomFeed } from '@/server/feed/feed';
import { CreateMyRoomFeedRequest, UpdateMyRoomFeedRequest } from '@/server/feed/request';
import { showRejectToast, showSuccessToast } from '@/utils/toast';
import { useMemberStore } from '@/zustand/store';

export const useGetMyRoomFeed = () => {
  const { roomInfo } = useMemberStore();

  return useQuery({
    ...queries.feed.detail({ roomId: roomInfo?.roomId ?? 0 }),
    enabled: roomInfo?.roomId !== undefined,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};

export const useCreateMyRoomFeed = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { roomInfo } = useMemberStore();

  return useMutation({
    mutationFn: (data: CreateMyRoomFeedRequest) => createMyRoomFeed(data),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.feed.detail({ roomId: roomInfo?.roomId ?? 0 }));
      showSuccessToast('피드가 생성되었습니다');
      router.back();
    },
    onError: () => {
      showRejectToast('피드 생성에 실패했어요');
    },
  });
};

export const useUpdateMyRoomFeed = () => {
  const queryClient = useQueryClient();
  const { roomInfo } = useMemberStore();
  const { mutate: createMutate } = useCreateMyRoomFeed();

  const router = useRouter();
  return useMutation({
    mutationFn: (data: UpdateMyRoomFeedRequest) => updateMyRoomFeed(data),
    onSuccess: () => {
      showSuccessToast('피드가 수정되었습니다');
      router.back();
    },
    onError: (error: Error, variables: UpdateMyRoomFeedRequest) => {
      if (isAxiosError(error) && error.response?.data?.code === 'FEED401') {
        showSuccessToast('피드가 없어 새로 생성됩니다.');
        createMutate(variables);
      } else {
        showRejectToast('피드 수정에 실패했어요');
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.feed.detail({ roomId: roomInfo?.roomId ?? 0 }));
    },
  });
};
