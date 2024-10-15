import React from 'react';
import { Text, Pressable } from 'react-native';

interface ChipComponentProps {
  index: number;
  chipData: {
    title: string;
    color: string;
  };
  handleModal: () => void;
}

const ChipComponent: React.FC<ChipComponentProps> = ({ index, chipData, handleModal }) => {
  return (
    <>
      {chipData.color == 'blue' && (
        <Pressable
          className="mb-2 mr-2 rounded-full border border-main1 bg-sub1 px-3.5 py-2"
          onPress={handleModal}
        >
          <Text className="text-xs font-semibold text-main1">{chipData.title}</Text>
        </Pressable>
      )}

      {chipData.color == 'red' && (
        <Pressable
          className="mb-2 mr-2 rounded-full border border-[#FF6868] bg-[#FFCACA] px-3.5 py-2"
          onPress={handleModal}
        >
          <Text className="text-xs font-semibold text-[#FF6868]">{chipData.title}</Text>
        </Pressable>
      )}

      {chipData.color == 'gray' && (
        <Pressable
          className="mb-2 mr-2 rounded-full border border-disabledFont bg-white px-3.5 py-2"
          onPress={handleModal}
        >
          <Text className="text-xs font-medium text-disabledFont">{chipData.title}</Text>
        </Pressable>
      )}
    </>
  );
};

export default ChipComponent;
