import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';

const LoadingComponent: React.FC = () => {
  return (
    <View className="absolute z-[10] flex h-screen w-screen items-center justify-center bg-black/30">
      <LottieView
        source={require('@/assets/lotties/cozymateLoading.json')}
        style={{ width: 76, height: 94.24 }}
        loop={true}
      />
      {/* <Image
        source={require('@/assets/gifs/cozymateLoading.gif')}
        className="h-[94.24px] w-[76px]"
        resizeMode="contain"
      /> */}
    </View>
  );
};

export default LoadingComponent;
