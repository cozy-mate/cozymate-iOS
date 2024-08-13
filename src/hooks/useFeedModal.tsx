import { useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';
export const useFeedModal = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalPosition, setModalPosition] = useState<{ top: number; right: number }>({
    top: 0,
    right: 0,
  });

  const dotIconRef = useRef<View>(null);

  const onPressModalOpen = () => {
    console.log('open');
    if (dotIconRef.current) {
      const windowWidth = Dimensions.get('window').width;
      dotIconRef.current.measure((x, y, width, height, pageX, pageY) => {
        setModalPosition({ top: pageY + width, right: windowWidth - (pageX + width) });
        setIsModalVisible(true);
      });
    }
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  return {
    isModalVisible,
    modalPosition,
    dotIconRef,
    onPressModalOpen,
    onPressModalClose,
  };
};
