import React from 'react';
import { View, Modal } from 'react-native';
import { Text, Pressable } from 'react-native';

import { getProfileImage } from '@utils/profileImage';

interface LifeStyleModalProps {
  title: string;
  color: string;
  memberList: {
    memberDetail: {
      memberId: number;
      nickname: string;
      gender: string;
      birthday: string;
      universityName: string;
      majorName: string;
      persona: number;
    };
    memberStat: Record<string, string | number>;
  }[];
  closeModal: () => void;
}

const LifeStyleModal: React.FC<LifeStyleModalProps> = ({
  title,
  color,
  memberList,
  closeModal,
}) => {
  const textColor =
    color === 'red' ? 'text-[#FF6868]' : color === 'blue' ? 'text-main1' : 'text-disabledFont';

  return (
    <Modal transparent={true} animationType="fade">
      <View className="absolute left-0 top-0 flex h-screen w-screen flex-col items-center justify-center space-y-6 bg-modalBack2 px-5">
        <View className="flex w-full flex-col justify-center rounded-xl bg-white p-4 pt-5">
          <Text className={`mb-4 text-center text-base font-semibold ${textColor}`}>{title}</Text>

          <View className="flex flex-col">
            {memberList.map((user, index) => (
              <View
                key={index}
                className={`flex flex-row items-center border-b border-b-[#F1F2F4] py-3 ${
                  index == 0 && 'pt-2'
                } ${index == memberList.length - 1 && 'border-0 pb-2'}`}
              >
                <View className="mr-2 flex flex-row items-center">
                  {getProfileImage(user.memberDetail.persona, 24, 24)}
                  <Text className="ml-1.5 text-sm font-medium text-emphasizedFont">
                    {user.memberDetail.nickname}
                  </Text>
                </View>

                {Object.entries(user.memberStat).map(([key, value]) => (
                  <Text key={key} className="text-sm font-medium text-colorFont">
                    {value !== null ? value : '-'}
                  </Text>
                ))}
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
