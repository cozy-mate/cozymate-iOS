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

const IntensityItems = ['안틀어요', '약하게 틀어요', '적당하게 틀어요', '강하게 틀어요'];

const SensitivityItems = [
  '매우 예민하지 않아요',
  '예민하지 않아요',
  '보통이에요',
  '예민해요',
  '매우 예민해요',
];

const LifeStyleModal: React.FC<LifeStyleModalProps> = ({
  title,
  color,
  memberList,
  closeModal,
}) => {
  const textColor =
    color === 'red' ? 'text-[#FF6868]' : color === 'blue' ? 'text-main1' : 'text-disabledFont';

  const truncateAnswer = (key: string, value: any) => {
    if (key === 'birthYear') {
      return `${value}년`;
    } else if (key === 'admissionYear') {
      return `${value}학번`;
    } else if (key === 'wakeUpTime' || key === 'sleepingTime' || key === 'turnOffTime') {
      const time = Number(value);
      const period = time < 12 ? '오전' : '오후';
      const formattedTime = time % 12 === 0 ? 12 : time % 12;
      return `${period} ${String(formattedTime).padStart(2, '0')}시`;
    } else if (key === 'airConditioningIntensity' || key === 'heatingIntensity') {
      return IntensityItems[Number(value)];
    } else if (key === 'cleanSensitivity' || key === 'noiseSensitivity') {
      return SensitivityItems[Number(value) - 1];
    } else {
      return value;
    }
  };

  return (
    <Modal transparent={true} animationType="fade">
      <View
        onTouchEnd={closeModal}
        className="absolute left-0 top-0 flex h-screen w-screen flex-col items-center justify-center space-y-6 bg-modalBack2 px-5"
      >
        <View
          onTouchEnd={(e) => e.stopPropagation()}
          className="flex w-full flex-col justify-center rounded-xl bg-white p-4 pt-5"
        >
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
                    {value !== null ? truncateAnswer(key, value) : '-'}
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
