import React from 'react';
import { View } from 'react-native';

import PostCard from '@components/feedMain/postCard';

import { PostCardType } from '@type/feed/postType';

type PostListProps = {
  postCards: PostCardType[];
  toFeedView: (postId: number) => void;
};

const PostList = (props: PostListProps) => {
  const { postCards, toFeedView } = props;

  return (
    <View className="mb-10 mt-5 w-full flex-1 flex-col items-start">
      {postCards.map((post, postIndex) => (
        <PostCard key={post.id} post={post} toFeedView={toFeedView} />
      ))}
    </View>
  );
};

export default PostList;
