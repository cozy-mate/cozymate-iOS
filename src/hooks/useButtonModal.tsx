import React from 'react';

export const useButtonModal = () => {
  const [isButtonModalVisible, setIsButtonModalVisible] = React.useState<boolean>(false);

  const handleButtonModalClose = () => {
    setIsButtonModalVisible(false);
  };

  const handleButtonModalOpen = () => {
    setIsButtonModalVisible(true);
  };

  return {
    isButtonModalVisible,
    handleButtonModalClose,
    handleButtonModalOpen,
  };
};
