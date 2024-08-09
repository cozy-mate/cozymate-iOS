import React, { Fragment } from 'react'
import { View } from 'react-native';
import { CommentType } from '@type/feed';
import CommentCard from '@components/feedView/commentCard';
type CommentListProps = {
    commentCards : CommentType[];
  }

const CommentList = (props: CommentListProps) => {
    const {
      commentCards,
    } = props;

    return (
        <View className="flex-1 flex-col w-full px-5 items-start mb-10">
          {commentCards.map((comment, commentIndex) => (
            <Fragment>
              <CommentCard 
                  key={comment.id} 
                  comment={comment}
                />
                {commentIndex !== commentCards.length - 1 &&
                  <View className='w-full border-t-[1px] border-[#F4F4F4]'></View>
                }
            </Fragment>
        ))}
    </View>
    )
}

export default CommentList