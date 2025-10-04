import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queries } from '@/server';
import { createComment, deleteComment, updateComment } from '@/server/comment/comment';
import { CreateCommentRequest, UpdateCommentRequest } from '@/server/comment/request';

export const useGetCommentList = ({ roomId, postId }: { roomId: number; postId: number }) => {
  return useQuery(queries.comment.list({ roomId, postId }));
};

export const useCreateComment = ({ roomId, postId }: { roomId: number; postId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentRequest) => createComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.comment.list({ roomId, postId }));
    },
  });
};

export const useUpdateComment = ({ roomId, postId }: { roomId: number; postId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCommentRequest) => updateComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.comment.list({ roomId, postId }));
    },
  });
};

export const useDeleteComment = ({
  roomId,
  postId,
  commentId,
}: {
  roomId: number;
  postId: number;
  commentId: number;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteComment({ commentId, roomId, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.comment.list({ roomId, postId }));
    },
  });
};
