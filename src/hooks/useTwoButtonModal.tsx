import React from 'react';

export const useTwoButtonModal = () => {
  const [isTwoButtonModalVisible, setIsTwoButtonModalVisible] = React.useState<boolean>(false);

  const handleTwoButtonModalClose = () => {
    setIsTwoButtonModalVisible(false);
  };

  const handleTwoButtonModalOpen = () => {
    setIsTwoButtonModalVisible(true);
  };

  return {
    isTwoButtonModalVisible,
    handleTwoButtonModalClose,
    handleTwoButtonModalOpen,
  };
};
