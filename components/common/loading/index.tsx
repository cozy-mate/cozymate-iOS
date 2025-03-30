import React from 'react';
import { View, Image } from 'react-native';

const LoadingComponent: React.FC = () => {
  return (
    <View className="absolute z-20 flex h-screen w-screen items-center justify-center bg-black/30">
      <Image source={require('@/assets/gifs/loading.gif')} className="h-20 w-20" />
    </View>
  );
};

export default LoadingComponent;
