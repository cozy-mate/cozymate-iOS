import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Keyboard } from 'react-native';

import { queries } from '@/server';
import { createComment, deleteComment, updateComment } from '@/server/comment/comment';
import { CreateCommentRequest, UpdateCommentRequest } from '@/server/comment/request';
import { showRejectToast, showSuccessToast } from '@/utils/toast';

export const useGetCommentList = ({ roomId, postId }: { roomId: number; postId: number }) => {
  return useQuery(queries.comment.list({ roomId, postId }));
};

export const useCreateComment = ({ roomId, postId }: { roomId: number; postId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentRequest) => createComment(data),
    onSuccess: () => {
      showSuccessToast('댓글이 생성되었습니다.');
      Keyboard.dismiss();
    },
    onError: (error) => {
      showRejectToast('댓글 생성에 실패했어요');
    },
    onSettled: () => {
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
  onSuccess,
}: {
  roomId: number;
  postId: number;
  commentId: number;
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteComment({ commentId, roomId, postId }),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries(queries.comment.list({ roomId, postId }));
    },
    onError: () => {
      showRejectToast('댓글 삭제에 실패했어요');
      queryClient.invalidateQueries(queries.comment.list({ roomId, postId }));
    },
  });
};
