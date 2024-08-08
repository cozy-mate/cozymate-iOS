import React, { useState } from 'react';
import { View } from 'react-native';
import { PostCardType } from '../../type/feed/postType';
import PostCard from './postCard';

type PostListProps = {
  postCards: PostCardType[];
};


const PostList = (props: PostListProps) => {
  const { postCards } = props;

  const [loadingStates, setLoadingStates] = useState(
    postCards.map(post => post.imageList.map(() => false))
  );

  const handleImageLoadStart = (postIndex: number, imageIndex: number) => {
    const updatedLoadingStates = [...loadingStates];
    updatedLoadingStates[postIndex][imageIndex] = true;
    setLoadingStates(updatedLoadingStates);
  };

  const handleImageLoadEnd = (postIndex: number, imageIndex: number) => {
    const updatedLoadingStates = [...loadingStates];
    updatedLoadingStates[postIndex][imageIndex] = false;
    setLoadingStates(updatedLoadingStates);
  };
  

  return (
    <View className="flex-1 flex-col w-full items-start mt-5 mb-10">
      {postCards.map((post, postIndex) => (
        <PostCard 
          key={post.id} 
          post={post}
          postIndex={postIndex}
          loadingStates={loadingStates}
          handleImageLoadStart={handleImageLoadStart}
          handleImageLoadEnd={handleImageLoadEnd}/>
      ))}
    </View>
  );
};

export default PostList;
