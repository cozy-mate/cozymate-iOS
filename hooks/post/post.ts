import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'expo-router';

import { matchMultiQueries, queries } from '@/server';
import { createPost, deletePost, updatePost } from '@/server/post/post';
import { CreatePostRequest, UpdatePostRequest } from '@/server/post/request';
import { GetPostListResponse } from '@/server/post/response';
import { showRejectToast, showSuccessToast } from '@/utils/toast';

export const useGetPostList = ({ roomId }: { roomId: number }) => {
  return useInfiniteQuery<GetPostListResponse>({
    ...queries.post.list({ roomId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetPostListResponse) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
    enabled: roomId !== 0,
  });
};

export const useGetPostDetail = ({ roomId, postId }: { roomId: number; postId: number }) => {
  return useQuery({
    ...queries.post.detail({ roomId, postId }),
    enabled: roomId !== 0 && postId !== 0,
    placeholderData: keepPreviousData,
  });
};

export const useCreatePost = ({ roomId }: { roomId: number }) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => createPost(data),
    onSuccess: () => {
      showSuccessToast('피드가 생성되었습니다');
      router.back();
    },
    onError: () => {
      showRejectToast('피드 생성에 실패했어요');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.post.list({ roomId }));
    },
  });
};

export const useUpdatePost = ({ roomId, postId }: { roomId: number; postId: number }) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdatePostRequest) => updatePost(data),
    onSuccess: () => {
      showSuccessToast('피드를 수정했어요');
      router.back();
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      }
      showRejectToast('피드 수정에 실패했어요');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.post.detail({ roomId, postId }).queryKey,
          queries.post.list({ roomId }).queryKey,
        ]),
      });
    },
  });
};

export const useDeletePost = ({
  roomId,
  postId,
  onSuccess,
}: {
  roomId: number;
  postId: number;
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost({ roomId, postId }),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({
        queryKey: queries.post._def,
      });
    },
    onError: () => {
      showRejectToast('피드 삭제에 실패했어요');
      queryClient.invalidateQueries({
        queryKey: queries.post._def,
      });
    },
  });
};
