import React from 'react';
import { Text, View, Modal, Pressable } from 'react-native';

interface ControlModalProps {
  items: { index: number; name: string; pressFunc: any }[];
  closeModal: () => void;
}

const ControlModal: React.FC<ControlModalProps> = ({ items, closeModal }) => {
  return (
    <Modal transparent={true} visible={true} animationType="fade">
      <View onTouchEnd={closeModal} className="h-full w-full">
        <View className="absolute right-2 top-[90px] flex flex-col items-center rounded-lg border border-[#EBEBEB] bg-white px-2 py-1">
          {items.map((item) => (
            <Pressable
              key={item.index}
              onPress={item.pressFunc}
              className={`border-b border-b-[#F6F6F6] ${item.index === items.length && 'border-0'}`}
            >
              <Text className="py-1.5 text-[10px] font-medium tracking-tight text-basicFont">
                {item.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default ControlModal;
