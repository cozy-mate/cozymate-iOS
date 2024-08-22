import React from 'react';
import { Modal, ActivityIndicator, View } from 'react-native';

interface LoadingComponentProps {
  visible: boolean;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ visible }) => {
  return (
    <Modal transparent={true} animationType="none" visible={visible} onRequestClose={() => {}}>
      <View
        className="absolute z-20 flex items-center justify-center w-screen h-screen"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      >
        <ActivityIndicator size="large" color="#68A4FF" />
      </View>
    </Modal>
  );
};

export default LoadingComponent;
