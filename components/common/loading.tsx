import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';

const LoadingComponent: React.FC = () => {
  return (
    <View className="absolute z-[10] inset-0 flex-1 items-center justify-center bg-black/30">
      <LottieView
        source={require('@/assets/lotties/cozymateLoading.json')}
        style={{ width: 76, height: 94.24 }}
        loop={true}
      />
    </View>
  );
};

export default LoadingComponent;
