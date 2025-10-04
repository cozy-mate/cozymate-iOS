import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queries } from '@/server';
import { createPost, deletePost, updatePost } from '@/server/post/post';
import { CreatePostRequest, UpdatePostRequest } from '@/server/post/request';
import { GetPostListResponse } from '@/server/post/response';

export const useGetPostList = ({ roomId }: { roomId: number }) => {
  return useInfiniteQuery({
    ...queries.post.list({ roomId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetPostListResponse) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};

export const useGetPostDetail = ({ roomId, postId }: { roomId: number; postId: number }) => {
  return useQuery(queries.post.detail({ roomId, postId }));
};

export const useCreatePost = ({ roomId }: { roomId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.post.list({ roomId }));
    },
  });
};

export const useUpdatePost = ({ roomId, postId }: { roomId: number; postId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePostRequest) => updatePost(data),
    onSuccess: () => {
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
      queryClient.invalidateQueries({
        queryKey: queries.post._def,
      });
    },
  });
};
