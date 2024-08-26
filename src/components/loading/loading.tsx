import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const LoadingComponent: React.FC = () => {
  return (
    <View
      className="absolute z-20 flex items-center justify-center w-screen h-screen"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
    >
      <ActivityIndicator size="large" color="#68A4FF" />
    </View>
  );
};

export default LoadingComponent;
