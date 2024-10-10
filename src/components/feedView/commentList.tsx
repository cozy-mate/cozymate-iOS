import { View } from 'react-native';
import React, { Fragment } from 'react';

import CommentCard from '@components/feedView/commentCard';

import { CommentType } from '@type/feed';
type CommentListProps = {
  commentCards: CommentType[];
  postId: number;
  updateComment: () => void;
};

const CommentList = (props: CommentListProps) => {
  const { commentCards, postId, updateComment } = props;

  return (
    <View className="mb-10 w-full flex-1 flex-col items-start px-5">
      {commentCards.map((comment, commentIndex) => (
        <Fragment>
          <CommentCard
            key={commentIndex}
            comment={comment}
            postId={postId}
            updateComment={updateComment}
          />
          {commentIndex !== commentCards.length - 1 && (
            <View className="w-full border-t border-[#F4F4F4]"></View>
          )}
        </Fragment>
      ))}
    </View>
  );
};

export default CommentList;
