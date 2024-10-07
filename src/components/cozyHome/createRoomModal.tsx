import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import GrayXButton from '@assets/createRoom/grayXButton.svg';
import PublickRoom from '@assets/createRoom/publicRoom.svg';
import PrivateRoom from '@assets/createRoom/privateRoom.svg';

interface CreateRoomModalProps {
  createPublic: () => void;
  createPrivate: () => void;
  close: () => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  createPublic,
  createPrivate,
  close,
}) => {
  return (
    <Modal>
      <View className="absolute top-0 left-0 flex flex-col items-center justify-center w-screen h-screen px-5 space-y-6 bg-blackBack">
        <Pressable onPress={close} className="absolute top-12 right-5">
          <GrayXButton />
        </Pressable>

        <Pressable
          className="flex flex-row items-center w-full p-4 space-x-5 bg-white rounded-xl"
          onPress={createPublic}
        >
          <PublickRoom />
          <View className="flex flex-col">
            <Text className="text-lg font-semibold tracking-tight text-emphasizedFont">
              룸메이트를 구할래요!
            </Text>
            <Text className="text-xs font-medium tracking-tight text-colorFont">
              공개방을 만들어, 룸메이트를 구할 수 있어요
            </Text>
          </View>
        </Pressable>

        <Pressable
          className="flex flex-row items-center w-full p-4 space-x-5 bg-white rounded-xl"
          onPress={createPrivate}
        >
          <PrivateRoom />
          <View className="flex flex-col">
            <Text className="text-lg font-semibold tracking-tight text-emphasizedFont">
              룸메이트가 이미 있어요!
            </Text>
            <Text className="text-xs font-medium tracking-tight text-colorFont">
              정해진 룸메이트를 초대코드로 초대할 수 있어요
            </Text>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
};

export default CreateRoomModal;
