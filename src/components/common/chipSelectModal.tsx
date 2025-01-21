import React from 'react';
import { View, Text, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';

import { usePreferencesStore } from '@zustand/member-stat/member-stat';

import { updatePreferenceList } from '@server/api/member-stat-preference';

import { useGetMemberList } from '@hooks/api/member-stat';
import { useGetFiveRandomRoom } from '@hooks/api/room-recommend';

import { LifestyleOptionKey } from '@utils/getLifeStyleIcon';

interface Item {
  index: number;
  id: LifestyleOptionKey;
  name: string;
}

interface ChipSelectModalProps {
  closeModal: () => void;
}

const ChipSelectModal: React.FC<ChipSelectModalProps> = ({ closeModal }) => {
  const { preferenceList, setPreferenceList } = usePreferencesStore();

  const { refetch: refetchRecommendMembers } = useGetMemberList();
  const { refetch: refetchRecommendRooms } = useGetFiveRandomRoom(5, 0);

  const items: Item[] = [
    { index: 1, id: 'birthYear', name: '출생년도' },
    { index: 2, id: 'admissionYear', name: '학번' },
    { index: 3, id: 'majorName', name: '학과' },
    { index: 4, id: 'acceptance', name: '합격여부' },
    { index: 5, id: 'wakeUpTime', name: '기상시간' },
    { index: 6, id: 'sleepingTime', name: '취침시간' },
    { index: 7, id: 'turnOffTime', name: '소등시간' },
    { index: 8, id: 'smoking', name: '흡연여부' },
    { index: 9, id: 'sleepingHabit', name: '잠버릇' },
    { index: 10, id: 'airConditioningIntensity', name: '에어컨' },
    { index: 11, id: 'heatingIntensity', name: '히터' },
    { index: 12, id: 'lifePattern', name: '생활패턴' },
    { index: 13, id: 'intimacy', name: '친밀도' },
    { index: 14, id: 'canShare', name: '물건공유' },
    { index: 15, id: 'isPlayGame', name: '게임여부' },
    { index: 16, id: 'isPhoneCall', name: '전화여부' },
    { index: 17, id: 'studying', name: '공부여부' },
    { index: 18, id: 'intake', name: '섭취여부' },
    { index: 19, id: 'cleanSensitivity', name: '청결예민도' },
    { index: 20, id: 'noiseSensitivity', name: '소음예민도' },
    { index: 21, id: 'cleaningFrequency', name: '청소빈도' },
    { index: 22, id: 'drinkingFrequency', name: '음주빈도' },
    { index: 23, id: 'personality', name: '성격' },
    { index: 24, id: 'mbti', name: 'MBTI' },
  ];

  const handleSelect = (itemId: LifestyleOptionKey) => {
    if (preferenceList.includes(itemId)) {
      setPreferenceList(preferenceList.filter((pref) => pref !== itemId));
    } else if (preferenceList.length < 4) {
      setPreferenceList([...preferenceList, itemId]);
    }
  };

  const updatePreferences = async (): Promise<void> => {
    await updatePreferenceList({ preferenceList });
    refetchRecommendMembers();
    refetchRecommendRooms();
    closeModal();
  };

  return (
    <Modal transparent={true} animationType="none">
      <TouchableWithoutFeedback onPress={closeModal}>
        <View className="absolute left-0 top-0 flex h-screen w-screen flex-col justify-end bg-modalBack">
          <TouchableWithoutFeedback>
            <View className="flex h-3/5 flex-col justify-between rounded-t-[20px] bg-white pt-11">
              <View className="pl-5 pr-3">
                <View className="mb-1 flex-row flex-wrap">
                  {items.map((item) => (
                    <Pressable
                      key={item.index}
                      className={`mb-3 mr-2 flex-row flex-wrap items-center justify-center rounded-full border px-[14px] py-2 ${
                        preferenceList.includes(item.id)
                          ? 'border-main1 bg-sub1'
                          : 'border-disabled bg-white'
                      }`}
                      onPress={() => handleSelect(item.id)}
                    >
                      <Text
                        className={`text-center text-sm font-medium tracking-tighter ${
                          preferenceList.includes(item.id) ? 'text-main1' : 'text-disabledFont'
                        }`}
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
              <View className="px-5">
                <Pressable
                  onPress={updatePreferences}
                  disabled={preferenceList.length !== 4}
                  className={`mb-[54px] rounded-lg p-4 ${
                    preferenceList.length !== 4 ? 'bg-[#C4C4C4]' : 'bg-main1'
                  }`}
                >
                  <Text className="text-center text-white">확인</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ChipSelectModal;
