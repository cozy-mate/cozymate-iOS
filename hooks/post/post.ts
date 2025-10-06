import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'expo-router';

import { queries } from '@/server';
import { createPost, deletePost, updatePost } from '@/server/post/post';
import { CreatePostRequest, UpdatePostRequest } from '@/server/post/request';
import { GetPostListResponse } from '@/server/post/response';
import { showRejectToast, showSuccessToast } from '@/utils/toast';

export const useGetPostList = ({ roomId }: { roomId: number }) => {
  return useQuery<GetPostListResponse>({
    ...queries.post.list({ roomId }),
    // initialPageParam: 0,
    // getNextPageParam: (lastPage: GetPostListResponse) => {
    //   if (lastPage.result.hasNext) {
    //     return lastPage.result.page + 1;
    //   }
    // },
    enabled: roomId !== 0,
  });
};

export const useGetPostDetail = ({ roomId, postId }: { roomId: number; postId: number }) => {
  return useQuery({
    ...queries.post.detail({ roomId, postId }),
    enabled: roomId !== 0,
    // @description : refreshcontrol에서 refetching을 사용하기 위해서 적용된 option
    gcTime: 0,
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
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      }
      showRejectToast('피드 생성에 실패했어요');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.post.list({ roomId }));
    },
  });
};

export const useUpdatePost = ({ roomId, postId }: { roomId: number; postId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePostRequest) => updatePost(data),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queries.post._def,
      });
    },
  });
};

export const useDeletePost = ({ roomId, postId }: { roomId: number; postId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost({ roomId, postId }),
    onSuccess: () => {
      showSuccessToast('피드가 삭제되었습니다');
    },
    onError: (error) => {
      showRejectToast('피드 삭제에 실패했어요');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queries.post._def,
      });
    },
  });
};
