import React from 'react';
import { View } from 'react-native';
import { Image, Modal } from 'react-native';

const LoadingComponent: React.FC = () => {
  return (
    <Modal transparent={true}>
      <View className="flex h-full w-full items-center justify-center bg-modalBack">
        <Image source={require('../../assets/loading.gif')} className="h-20 w-20" />
        {/* <ActivityIndicator size="large" color="#68A4FF" /> */}
      </View>
    </Modal>
  );
};

export default LoadingComponent;
