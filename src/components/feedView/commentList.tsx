import React, { Fragment } from 'react';
import { View } from 'react-native';
import { CommentType } from '@type/feed';
import CommentCard from '@components/feedView/commentCard';
type CommentListProps = {
  commentCards: CommentType[];
  postId: number;
  updateComment : () => void;
};

const CommentList = (props: CommentListProps) => {
  const { commentCards,postId,updateComment } = props;

  return (
    <View className="flex-col items-start flex-1 w-full px-5 mb-10">
      {commentCards.map((comment, commentIndex) => (
        <Fragment>
          <CommentCard key={commentIndex} comment={comment} postId={postId} updateComment={updateComment}/>
          {commentIndex !== commentCards.length - 1 && (
            <View className="w-full border-t-[1px] border-[#F4F4F4]"></View>
          )}
        </Fragment>
      ))}
    </View>
  );
};

export default CommentList;
