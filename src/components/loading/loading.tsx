import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingComponent: React.FC = () => {
  return (
    <View
      className="absolute z-20 flex h-screen w-screen items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
    >
      <ActivityIndicator size="large" color="#68A4FF" />
    </View>
  );
};

export default LoadingComponent;
