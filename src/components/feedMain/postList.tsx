import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { PostCardType } from '../../type/feed/postType';
import PostCard from './postCard';

type PostListProps = {
  postCards: PostCardType[];
};


const PostList = (props: PostListProps) => {
  const { postCards } = props;

  return (
    <View className="flex-1 flex-col w-full items-start mt-5 mb-10">
      {postCards.map((post, postIndex) => (
        <PostCard 
          key={post.id} 
          post={post}
          />
      ))}
    </View>
  );
};

export default PostList;
