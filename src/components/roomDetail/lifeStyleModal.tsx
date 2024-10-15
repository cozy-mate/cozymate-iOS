import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import { Text, Pressable } from 'react-native';

import { getProfileImage } from '@utils/profileImage';

interface UserItem {
  nickname: string;
  persona: number;
  value: string;
}

interface LifeStyleDataItem {
  title: string;
  userList: UserItem[];
}

interface LifeStyleModalProps {
  closeModal: () => void;
}

const LifeStyleModal: React.FC<LifeStyleModalProps> = ({ closeModal }) => {
  const [lifeStyleData, setLifeStyleData] = useState<LifeStyleDataItem>({
    title: '섭취여부',
    userList: [
      { nickname: '델로', persona: 1, value: '간단한 간식은 괜찮아요' },
      { nickname: '델로', persona: 1, value: '간단한 간식은 괜찮아요' },
      { nickname: '델로', persona: 1, value: '간단한 간식은 괜찮아요' },
      { nickname: '델로', persona: 1, value: '간단한 간식은 괜찮아요' },
    ],
  });

  return (
    <Modal transparent={true} animationType="fade">
      <View className="absolute left-0 top-0 flex h-screen w-screen flex-col items-center justify-center space-y-6 bg-modalBack2 px-5">
        <View className="flex w-full flex-col justify-center rounded-xl bg-white p-4 pt-5">
          <Text className="mb-4 text-center text-base font-semibold">{lifeStyleData.title}</Text>

          <View className="flex flex-col">
            {lifeStyleData.userList.map((user, index) => (
              <View
                key={index}
                className={`flex flex-row items-center border-b border-b-[#F1F2F4] py-3 ${index == 0 && 'pt-2'} ${index == lifeStyleData.userList.length - 1 && 'border-0 pb-2'}`}
              >
                <View className="mr-2 flex flex-row items-center">
                  {getProfileImage(user.persona, 24, 24)}
                  <Text className="ml-1.5 text-sm font-medium text-emphasizedFont">
                    {user.nickname}
                  </Text>
                </View>

                <Text className="flex flex-row text-sm font-medium text-colorFont">
                  {user.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable onPress={closeModal}>
          <Text className="text-sm font-semibold text-disabledFont">닫기</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default LifeStyleModal;
