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
  const [profileLoadingStates, setProfileLoadingStates] = useState(
    postCards.map(() => false)
  );

  const handleProfileImageLoadStart = (postIndex: number) => {
    const updatedLoadingStates = [...profileLoadingStates];
    updatedLoadingStates[postIndex] = true;
    setProfileLoadingStates(updatedLoadingStates);
  }

  const handleProfileImageLoadEnd = (postIndex: number) => {
    const updatedLoadingStates = [...profileLoadingStates];
    updatedLoadingStates[postIndex] = false;
    setProfileLoadingStates(updatedLoadingStates);
  }

  const handlePostImageLoadStart = (postIndex: number, imageIndex: number) => {
    const updatedLoadingStates = [...loadingStates];
    updatedLoadingStates[postIndex][imageIndex] = true;
    setLoadingStates(updatedLoadingStates);
  };

  const handlePostImageLoadEnd = (postIndex: number, imageIndex: number) => {
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
          profileLoadingStates={profileLoadingStates}
          handleProfileImageLoadStart={handleProfileImageLoadStart}
          handleProfileImageLoadEnd={handleProfileImageLoadEnd}
          handlePostImageLoadStart={handlePostImageLoadStart}
          handlePostImageLoadEnd={handlePostImageLoadEnd}/>
      ))}
    </View>
  );
};

export default PostList;
