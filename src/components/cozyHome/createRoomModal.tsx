import React from 'react';
import { Text, View, Modal, Pressable } from 'react-native';

import PublickRoom from '@assets/createRoom/publicRoom.svg';
import GrayXButton from '@assets/createRoom/grayXButton.svg';
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
      <View className="absolute left-0 top-0 flex h-screen w-screen flex-col items-center justify-center space-y-6 bg-blackBack px-5">
        <Pressable onPress={close} className="absolute right-5 top-12">
          <GrayXButton />
        </Pressable>

        <Pressable
          className="flex w-full flex-row items-center space-x-5 rounded-xl bg-white p-4"
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
          className="flex w-full flex-row items-center space-x-5 rounded-xl bg-white p-4"
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
